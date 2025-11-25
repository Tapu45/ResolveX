import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/client";

export type Role =
    | "org:owner"
    | "org:admin"
    | "workspace:admin"
    | "support:manager"
    | "support:agent"
    | "client"
    | "viewer";

export const PERMISSIONS = {
    // Organization permissions
    "org:manage": ["org:owner", "org:admin"],
    "org:view": ["org:owner", "org:admin", "workspace:admin", "support:manager", "support:agent", "viewer"],
    "org:billing": ["org:owner", "org:admin"],

    // Workspace permissions
    "workspace:create": ["org:owner", "org:admin"],
    "workspace:manage": ["org:owner", "org:admin", "workspace:admin"],
    "workspace:view": ["org:owner", "org:admin", "workspace:admin", "support:manager", "support:agent", "viewer"],

    // Complaint permissions
    "complaint:create": ["org:owner", "org:admin", "workspace:admin", "support:manager", "support:agent", "client"],
    "complaint:manage": ["org:owner", "org:admin", "workspace:admin", "support:manager"],
    "complaint:assign": ["org:owner", "org:admin", "workspace:admin", "support:manager"],
    "complaint:view": ["org:owner", "org:admin", "workspace:admin", "support:manager", "support:agent", "viewer", "client"],

    // User permissions
    "user:manage": ["org:owner", "org:admin"],
    "user:view": ["org:owner", "org:admin", "workspace:admin", "support:manager"],
} as const;

export async function hasPermission(
    permission: keyof typeof PERMISSIONS,
    organizationId?: string,
    workspaceId?: string
): Promise<boolean> {
    const { userId, orgId } = await auth();

    if (!userId) {
        return false;
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        include: {
            organizationMembers: {
                where: organizationId
                    ? {
                        organization: {
                            id: organizationId,
                        },
                    }
                    : orgId
                        ? {
                            organization: {
                                clerkOrganizationId: orgId,
                            },
                        }
                        : undefined,
                include: {
                    organization: true,
                },
            },
            workspaceMembers: workspaceId
                ? {
                    where: {
                        workspaceId,
                    },
                    include: {
                        workspace: true,
                    },
                }
                : undefined,
        },
    });

    if (!user) {
        return false;
    }

    // Get user roles
    const orgRole = user.organizationMembers[0]?.role as Role | undefined;
    const workspaceRole = user.workspaceMembers?.[0]?.role as Role | undefined;

    // Check if user has required role for permission
    const allowedRoles = Array.from(PERMISSIONS[permission]) as Role[];
    const userRoles = [orgRole, workspaceRole].filter(
        (role): role is Role => role !== undefined && allowedRoles.includes(role)
    );

    return userRoles.length > 0;
}

export async function requirePermission(
    permission: keyof typeof PERMISSIONS,
    organizationId?: string,
    workspaceId?: string
) {
    const hasAccess = await hasPermission(permission, organizationId, workspaceId);

    if (!hasAccess) {
        throw new Error("Insufficient permissions");
    }

    return true;
}