import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/client";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const logger = createLogger("WorkspaceAPI");

// ============ VALIDATION SCHEMAS ============

const createWorkspaceSchema = z.object({
    organizationId: z
        .string()
        .uuid("Invalid organization ID"),
    name: z
        .string()
        .min(1, "Workspace name is required")
        .max(255, "Workspace name must be less than 255 characters"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(100, "Slug must be less than 100 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
});

const updateWorkspaceSchema = z.object({
    name: z
        .string()
        .min(1, "Workspace name is required")
        .max(255, "Workspace name must be less than 255 characters")
        .optional(),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(100, "Slug must be less than 100 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
        .optional(),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional()
        .or(z.literal("")),
    settings: z.record(z.string(), z.any()).optional(),
});

// ============ GET - Fetch Workspaces ============

async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        const searchParams = req.nextUrl.searchParams;
        const organizationId = searchParams.get("organizationId");

        logger.logRequest("GET", `/api/workspaces?organizationId=${organizationId}`, userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized GET request - No user ID");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!organizationId) {
            logger.warn("Missing organizationId in GET request");
            logger.logResponse(400, "Organization ID is required");
            return NextResponse.json({ error: "Organization ID is required" }, { status: 400 });
        }

        // Find internal user by Clerk userId
        const dbUser = await prisma.user.findUnique({
            where: { clerkUserId: userId },
        });
        if (!dbUser) {
            logger.warn("User not found in database", { clerkUserId: userId });
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Check if user is member of organization
        const orgMember = await prisma.organizationMember.findUnique({
            where: {
                organizationId_userId: {
                    organizationId,
                    userId: dbUser.id, // <-- Use internal user ID!
                },
            },
        });

        if (!orgMember) {
            logger.warn("User is not a member of this organization", { organizationId, userId: dbUser.id });
            logger.logResponse(403, "Access denied");
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        // Get all workspaces for the organization
        const workspaces = await prisma.workspace.findMany({
            where: { organizationId },
            include: {
                workspaceMembers: true,
                _count: {
                    select: {
                        complaints: true,
                        projects: true,
                        workspaceMembers: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        logger.success(`Fetched ${workspaces.length} workspaces`, {
            organizationId,
            userId: dbUser.id,
            count: workspaces.length,
        });
        logger.logResponse(200, "Workspaces fetched successfully");

        return NextResponse.json({ success: true, data: workspaces }, { status: 200 });
    } catch (error) {
        logger.error("Error fetching workspaces", error);
        logger.logResponse(500, "Failed to fetch workspaces");
        return NextResponse.json({ error: "Failed to fetch workspaces" }, { status: 500 });
    }
}

// ============ POST - Create Workspace ============

async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        logger.logRequest("POST", "/api/workspaces", userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized POST request - No user ID");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        logger.debug("Request body received", { body });

        // Validate request body
        const validatedData = createWorkspaceSchema.parse(body);
        logger.debug("Validation passed", { validatedData });

        const { organizationId, name, slug, description } = validatedData;

        logger.debug("Checking if user is member of organization", { organizationId, userId });

        // Check if user is member of organization (and has permission to create workspace)
        const orgMember = await prisma.organizationMember.findUnique({
            where: {
                organizationId_userId: {
                    organizationId,
                    userId,
                },
            },
        });

        if (!orgMember || !["owner", "admin"].includes(orgMember.role)) {
            logger.warn("Insufficient permissions to create workspace", {
                organizationId,
                userId,
                userRole: orgMember?.role,
            });
            logger.logResponse(403, "Insufficient permissions");

            return NextResponse.json(
                { error: "Insufficient permissions to create workspace" },
                { status: 403 }
            );
        }

        logger.debug("Checking if workspace slug already exists in organization", {
            organizationId,
            slug,
        });

        // Check if slug already exists in this organization
        const existingWorkspace = await prisma.workspace.findUnique({
            where: {
                organizationId_slug: {
                    organizationId,
                    slug,
                },
            },
        });

        if (existingWorkspace) {
            logger.warn("Workspace slug already exists in organization", { organizationId, slug });
            logger.logResponse(400, "Workspace slug already exists");

            return NextResponse.json(
                { error: "Workspace slug already exists in this organization" },
                { status: 400 }
            );
        }

        logger.info("Creating workspace", { organizationId, name, slug, userId });

        // Create workspace with user as admin
        const workspace = await prisma.$transaction(async (tx) => {
            // Create workspace
            const ws = await tx.workspace.create({
                data: {
                    organizationId,
                    name,
                    slug,
                    description: description || null,
                },
            });

            logger.debug("Workspace created", { workspaceId: ws.id });

            // Add user as workspace admin
            await tx.workspaceMember.create({
                data: {
                    workspaceId: ws.id,
                    userId,
                    role: "admin",
                    permissions: {},
                },
            });

            logger.debug("User added as workspace admin", { workspaceId: ws.id, userId });

            return ws;
        });

        logger.success("Workspace created successfully", {
            workspaceId: workspace.id,
            slug: workspace.slug,
            organizationId,
            userId,
        });
        logger.logResponse(201, "Workspace created successfully");

        return NextResponse.json(
            {
                success: true,
                message: "Workspace created successfully",
                data: workspace,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.validationError("Workspace creation validation failed", error, { userId: (await auth()).userId });
            logger.logResponse(400, "Validation failed");

            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    })),
                },
                { status: 400 }
            );
        }

        logger.error("Error creating workspace", error, { userId: (await auth()).userId });
        logger.logResponse(500, "Failed to create workspace");

        return NextResponse.json(
            { error: "Failed to create workspace" },
            { status: 500 }
        );
    }
}

// ============ PUT - Update Workspace ============

async function PUT(req: NextRequest) {
    try {
        const { userId } = await auth();
        const searchParams = req.nextUrl.searchParams;
        const workspaceId = searchParams.get("id");

        logger.logRequest("PUT", `/api/workspaces?id=${workspaceId}`, userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized PUT request - No user ID");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!workspaceId) {
            logger.warn("Missing workspace ID in PUT request");
            logger.logResponse(400, "Workspace ID is required");

            return NextResponse.json(
                { error: "Workspace ID is required" },
                { status: 400 }
            );
        }

        logger.debug("Checking permissions for workspace update", { workspaceId, userId });

        // Check if user is workspace admin/owner
        const member = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId,
                },
            },
        });

        if (!member || !["owner", "admin"].includes(member.role)) {
            logger.warn("Insufficient permissions for workspace update", {
                workspaceId,
                userId,
                userRole: member?.role,
            });
            logger.logResponse(403, "Insufficient permissions");

            return NextResponse.json(
                { error: "Insufficient permissions" },
                { status: 403 }
            );
        }

        const body = await req.json();
        logger.debug("Update request body received", { body });

        // Validate request body
        const validatedData = updateWorkspaceSchema.parse(body);
        logger.debug("Update validation passed", { validatedData });

        // Get workspace to check if slug change is valid
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
        });

        if (!workspace) {
            logger.warn("Workspace not found", { workspaceId });
            logger.logResponse(404, "Workspace not found");

            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }

        // If slug is being changed, check if new slug exists
        if (validatedData.slug && validatedData.slug !== workspace.slug) {
            logger.debug("Checking if new slug already exists", {
                organizationId: workspace.organizationId,
                newSlug: validatedData.slug,
            });

            const existingWorkspace = await prisma.workspace.findUnique({
                where: {
                    organizationId_slug: {
                        organizationId: workspace.organizationId,
                        slug: validatedData.slug,
                    },
                },
            });

            if (existingWorkspace) {
                logger.warn("New workspace slug already exists", {
                    organizationId: workspace.organizationId,
                    slug: validatedData.slug,
                });
                logger.logResponse(400, "Workspace slug already exists");

                return NextResponse.json(
                    { error: "Workspace slug already exists in this organization" },
                    { status: 400 }
                );
            }
        }

        logger.info("Updating workspace", { workspaceId, updates: validatedData });

        // Update workspace
        const updatedWorkspace = await prisma.workspace.update({
            where: { id: workspaceId },
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description,
                settings: validatedData.settings ? JSON.stringify(validatedData.settings) : undefined,
                updatedAt: new Date(),
            },
        });

        logger.success("Workspace updated successfully", {
            workspaceId,
            updatedFields: Object.keys(validatedData),
        });
        logger.logResponse(200, "Workspace updated successfully");

        return NextResponse.json(
            {
                success: true,
                message: "Workspace updated successfully",
                data: updatedWorkspace,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.validationError("Workspace update validation failed", error);
            logger.logResponse(400, "Validation failed");

            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: error.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    })),
                },
                { status: 400 }
            );
        }

        logger.error("Error updating workspace", error);
        logger.logResponse(500, "Failed to update workspace");

        return NextResponse.json(
            { error: "Failed to update workspace" },
            { status: 500 }
        );
    }
}

// ============ DELETE - Delete Workspace ============

async function DELETE(req: NextRequest) {
    try {
        const { userId } = await auth();
        const searchParams = req.nextUrl.searchParams;
        const workspaceId = searchParams.get("id");

        logger.logRequest("DELETE", `/api/workspaces?id=${workspaceId}`, userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized DELETE request - No user ID");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!workspaceId) {
            logger.warn("Missing workspace ID in DELETE request");
            logger.logResponse(400, "Workspace ID is required");

            return NextResponse.json(
                { error: "Workspace ID is required" },
                { status: 400 }
            );
        }

        logger.debug("Checking permissions for workspace deletion", { workspaceId, userId });

        // Check if user is workspace owner/admin
        const member = await prisma.workspaceMember.findUnique({
            where: {
                workspaceId_userId: {
                    workspaceId,
                    userId,
                },
            },
        });

        if (!member || !["owner", "admin"].includes(member.role)) {
            logger.warn("Insufficient permissions for workspace deletion", {
                workspaceId,
                userId,
                userRole: member?.role,
            });
            logger.logResponse(403, "Insufficient permissions");

            return NextResponse.json(
                { error: "Insufficient permissions to delete workspace" },
                { status: 403 }
            );
        }

        // Get workspace to check if it's the default workspace
        const workspace = await prisma.workspace.findUnique({
            where: { id: workspaceId },
        });

        if (!workspace) {
            logger.warn("Workspace not found", { workspaceId });
            logger.logResponse(404, "Workspace not found");

            return NextResponse.json(
                { error: "Workspace not found" },
                { status: 404 }
            );
        }

        // Prevent deletion of default workspace
        if (workspace.slug === "default") {
            logger.warn("Cannot delete default workspace", { workspaceId });
            logger.logResponse(400, "Cannot delete default workspace");

            return NextResponse.json(
                { error: "Cannot delete default workspace" },
                { status: 400 }
            );
        }

        logger.info("Deleting workspace", { workspaceId, slug: workspace.slug, userId });

        // Delete workspace (cascades to all related data)
        await prisma.workspace.delete({
            where: { id: workspaceId },
        });

        logger.success("Workspace deleted successfully", { workspaceId, slug: workspace.slug, userId });
        logger.logResponse(200, "Workspace deleted successfully");

        return NextResponse.json(
            {
                success: true,
                message: "Workspace deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error("Error deleting workspace", error);
        logger.logResponse(500, "Failed to delete workspace");

        return NextResponse.json(
            { error: "Failed to delete workspace" },
            { status: 500 }
        );
    }
}

export { GET, POST, PUT, DELETE };