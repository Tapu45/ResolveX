import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/client";

export async function getCurrentUser() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    return user;
}

export async function getCurrentUserWithOrg() {
    const { userId, orgId } = await auth();

    if (!userId) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
        include: {
            organizationMembers: {
                where: orgId
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
        },
    });

    return user;
}

export async function getCurrentOrganization() {
    const { orgId } = await auth();

    if (!orgId) {
        return null;
    }

    const organization = await prisma.organization.findUnique({
        where: { clerkOrganizationId: orgId },
        include: {
            workspaces: {
                orderBy: { createdAt: "desc" },
            },
        },
    });

    return organization;
}