import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/client";
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const logger = createLogger("OrganizationAPI");

// ============ VALIDATION SCHEMAS ============

const createOrganizationSchema = z.object({
    name: z
        .string()
        .min(1, "Organization name is required")
        .max(255, "Organization name must be less than 255 characters"),
    slug: z
        .string()
        .min(1, "Slug is required")
        .max(100, "Slug must be less than 100 characters")
        .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
    domain: z
        .string()
        .url("Invalid domain URL")
        .optional()
        .or(z.literal("")),
    logoUrl: z
        .string()
        .url("Invalid logo URL")
        .optional()
        .or(z.literal("")),
    billingEmail: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
});

const updateOrganizationSchema = z.object({
    name: z
        .string()
        .min(1, "Organization name is required")
        .max(255, "Organization name must be less than 255 characters")
        .optional(),
    logoUrl: z
        .string()
        .url("Invalid logo URL")
        .optional()
        .or(z.literal("")),
    domain: z
        .string()
        .url("Invalid domain URL")
        .optional()
        .or(z.literal("")),
    billingEmail: z
        .string()
        .email("Invalid email address")
        .optional()
        .or(z.literal("")),
    settings: z.record(z.string(), z.any()).optional(),
});

// ============ GET - Fetch Organizations ============

async function GET(req: NextRequest) {
    try {
        const { userId, orgId } = await auth();

        logger.logRequest("GET", "/api/organizations", userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized GET request - No user ID");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        logger.debug("Fetching organizations for user", { userId });

        // Get all organizations where user is a member
        const organizations = await prisma.organization.findMany({
            where: {
                organizationMembers: {
                    some: {
                        userId: userId,
                    },
                },
            },
            include: {
                organizationMembers: true,
                workspaces: true,
                subscriptions: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        logger.success(`Fetched ${organizations.length} organizations`, { userId, count: organizations.length });
        logger.logResponse(200, "Organizations fetched successfully");

        return NextResponse.json(
            {
                success: true,
                data: organizations,
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error("Error fetching organizations", error);
        logger.logResponse(500, "Failed to fetch organizations");

        return NextResponse.json(
            { error: "Failed to fetch organizations" },
            { status: 500 }
        );
    }
}

// ============ POST - Create Organization ============

async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        logger.logRequest("POST", "/api/organizations", userId ?? undefined);

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
        const validatedData = createOrganizationSchema.parse(body);
        logger.debug("Validation passed", { validatedData });

        // Check if slug already exists
        const existingOrg = await prisma.organization.findUnique({
            where: { slug: validatedData.slug },
        });

        if (existingOrg) {
            logger.warn("Organization slug already exists", { slug: validatedData.slug });
            logger.logResponse(400, "Organization slug already exists");

            return NextResponse.json(
                { error: "Organization slug already exists" },
                { status: 400 }
            );
        }

        logger.info("Creating organization and default workspace", { slug: validatedData.slug, userId });

        // Create organization and default workspace in a transaction
        const organization = await prisma.$transaction(async (tx) => {
            // Create organization
            const org = await tx.organization.create({
                data: {
                    clerkOrganizationId: `${validatedData.slug}-${Date.now()}`,
                    name: validatedData.name,
                    slug: validatedData.slug,
                    domain: validatedData.domain || null,
                    logoUrl: validatedData.logoUrl || null,
                    billingEmail: validatedData.billingEmail || null,
                },
            });

            logger.debug("Organization created", { organizationId: org.id, slug: org.slug });

            // Create default workspace
            const workspace = await tx.workspace.create({
                data: {
                    organizationId: org.id,
                    name: "Default Workspace",
                    slug: "default",
                    description: "Your default workspace",
                },
            });

            logger.debug("Default workspace created", { workspaceId: workspace.id });

            // Add user as organization owner
            await tx.organizationMember.create({
                data: {
                    organizationId: org.id,
                    userId: userId,
                    role: "owner",
                    permissions: {},
                },
            });

            logger.debug("User added as organization owner");

            // Add user as workspace admin
            await tx.workspaceMember.create({
                data: {
                    workspaceId: workspace.id,
                    userId: userId,
                    role: "admin",
                    permissions: {},
                },
            });

            logger.debug("User added as workspace admin");

            return org;
        });

        logger.success("Organization created successfully", {
            organizationId: organization.id,
            slug: organization.slug,
            userId,
        });
        logger.logResponse(201, "Organization created successfully");

        return NextResponse.json(
            {
                success: true,
                message: "Organization created successfully",
                data: organization,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.validationError("Organization creation validation failed", error, { userId: (await auth()).userId });
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

        logger.error("Error creating organization", error, { userId: (await auth()).userId });
        logger.logResponse(500, "Failed to create organization");

        return NextResponse.json(
            { error: "Failed to create organization" },
            { status: 500 }
        );
    }
}

// ============ PUT - Update Organization ============

async function PUT(req: NextRequest) {
    try {
        const { userId } = await auth();
        const searchParams = req.nextUrl.searchParams;
        const organizationId = searchParams.get("id");

        logger.logRequest("PUT", `/api/organizations?id=${organizationId}`, userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized PUT request - No user ID");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!organizationId) {
            logger.warn("Missing organization ID in PUT request");
            logger.logResponse(400, "Organization ID is required");

            return NextResponse.json(
                { error: "Organization ID is required" },
                { status: 400 }
            );
        }

        logger.debug("Checking permissions for organization update", { organizationId, userId });

        // Check if user is organization admin/owner
        const member = await prisma.organizationMember.findUnique({
            where: {
                organizationId_userId: {
                    organizationId,
                    userId,
                },
            },
        });

        if (!member || !["owner", "admin"].includes(member.role)) {
            logger.warn("Insufficient permissions for organization update", { organizationId, userId, userRole: member?.role });
            logger.logResponse(403, "Insufficient permissions");

            return NextResponse.json(
                { error: "Insufficient permissions" },
                { status: 403 }
            );
        }

        const body = await req.json();
        logger.debug("Update request body received", { body });

        // Validate request body
        const validatedData = updateOrganizationSchema.parse(body);
        logger.debug("Update validation passed", { validatedData });

        // Update organization
        const organization = await prisma.organization.update({
            where: { id: organizationId },
            data: {
                name: validatedData.name,
                logoUrl: validatedData.logoUrl,
                domain: validatedData.domain,
                billingEmail: validatedData.billingEmail,
                settings: validatedData.settings ? JSON.stringify(validatedData.settings) : undefined,
                updatedAt: new Date(),
            },
        });

        logger.success("Organization updated successfully", {
            organizationId,
            updatedFields: Object.keys(validatedData),
        });
        logger.logResponse(200, "Organization updated successfully");

        return NextResponse.json(
            {
                success: true,
                message: "Organization updated successfully",
                data: organization,
            },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.validationError("Organization update validation failed", error);
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

        logger.error("Error updating organization", error);
        logger.logResponse(500, "Failed to update organization");

        return NextResponse.json(
            { error: "Failed to update organization" },
            { status: 500 }
        );
    }
}

// ============ DELETE - Delete Organization ============

async function DELETE(req: NextRequest) {
    try {
        const { userId } = await auth();
        const searchParams = req.nextUrl.searchParams;
        const organizationId = searchParams.get("id");

        logger.logRequest("DELETE", `/api/organizations?id=${organizationId}`, userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized DELETE request - No user ID");
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        if (!organizationId) {
            logger.warn("Missing organization ID in DELETE request");
            logger.logResponse(400, "Organization ID is required");

            return NextResponse.json(
                { error: "Organization ID is required" },
                { status: 400 }
            );
        }

        logger.debug("Checking permissions for organization deletion", { organizationId, userId });

        // Check if user is organization owner (only owner can delete)
        const member = await prisma.organizationMember.findUnique({
            where: {
                organizationId_userId: {
                    organizationId,
                    userId,
                },
            },
        });

        if (!member || member.role !== "owner") {
            logger.warn("Only organization owner can delete", { organizationId, userId, userRole: member?.role });
            logger.logResponse(403, "Only organization owner can delete");

            return NextResponse.json(
                { error: "Only organization owner can delete" },
                { status: 403 }
            );
        }

        logger.info("Deleting organization", { organizationId, userId });

        // Delete organization (cascades to workspaces, members, etc.)
        await prisma.organization.delete({
            where: { id: organizationId },
        });

        logger.success("Organization deleted successfully", { organizationId, userId });
        logger.logResponse(200, "Organization deleted successfully");

        return NextResponse.json(
            {
                success: true,
                message: "Organization deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        logger.error("Error deleting organization", error);
        logger.logResponse(500, "Failed to delete organization");

        return NextResponse.json(
            { error: "Failed to delete organization" },
            { status: 500 }
        );
    }
}

export { GET, POST, PUT, DELETE };