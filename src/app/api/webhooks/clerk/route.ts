import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma/client";
import { createLogger } from "@/lib/logger";

const logger = createLogger("ClerkWebhook");

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        logger.error("Missing CLERK_WEBHOOK_SECRET");
        throw new Error("Please add CLERK_WEBHOOK_SECRET to .env.local");
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    logger.logRequest("POST", "/api/webhooks/clerk", "system");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        logger.warn("Missing SVix headers");
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;

        logger.debug("Webhook signature verified", { eventType: evt.type });
    } catch (err) {
        logger.error("Error verifying webhook signature", err);
        return new Response("Error occurred", {
            status: 400,
        });
    }

    const eventType = evt.type;

    try {
        switch (eventType) {
            case "user.created":
            case "user.updated": {
                const { id, email_addresses, first_name, last_name, image_url } = evt.data;

                logger.info(`Processing user ${eventType}`, {
                    clerkUserId: id,
                    email: email_addresses[0]?.email_address,
                });

                // Validate email exists
                if (!email_addresses || email_addresses.length === 0) {
                    logger.warn("User has no email address", { clerkUserId: id });
                    return new Response("User email required", { status: 400 });
                }

                const email = email_addresses[0].email_address;
                const fullName =
                    first_name && last_name
                        ? `${first_name} ${last_name}`
                        : first_name || last_name || null;

                await prisma.user.upsert({
                    where: { clerkUserId: id },
                    update: {
                        email,
                        name: fullName,
                        avatarUrl: image_url || null,
                    },
                    create: {
                        clerkUserId: id,
                        email,
                        name: fullName,
                        avatarUrl: image_url || null,
                    },
                });

                logger.success(`User ${eventType} processed`, {
                    clerkUserId: id,
                    email,
                });
                break;
            }

            case "user.deleted": {
                const { id } = evt.data;

                logger.info("Processing user.deleted", { clerkUserId: id });

                await prisma.user.delete({
                    where: { clerkUserId: id },
                });

                logger.success("User deleted", { clerkUserId: id });
                break;
            }

            case "organization.created":
            case "organization.updated": {
                const { id, name, slug, image_url } = evt.data;

                logger.info(`Processing organization ${eventType}`, {
                    clerkOrgId: id,
                    slug,
                });

                // Validate required fields
                if (!name) {
                    logger.warn("Organization missing name", { clerkOrgId: id });
                    return new Response("Organization name required", { status: 400 });
                }

                if (!slug) {
                    logger.warn("Organization missing slug", { clerkOrgId: id });
                    return new Response("Organization slug required", { status: 400 });
                }

                // Check if slug already exists (for create only)
                if (eventType === "organization.created") {
                    const existingOrg = await prisma.organization.findUnique({
                        where: { slug },
                    });

                    if (existingOrg) {
                        logger.warn("Organization slug already exists", { slug });
                        return new Response("Organization slug already exists", {
                            status: 409,
                        });
                    }
                }

                await prisma.organization.upsert({
                    where: { clerkOrganizationId: id },
                    update: {
                        name,
                        slug,
                        logoUrl: image_url || null,
                    },
                    create: {
                        clerkOrganizationId: id,
                        name,
                        slug,
                        logoUrl: image_url || null,
                    },
                });

                logger.success(`Organization ${eventType} processed`, {
                    clerkOrgId: id,
                    slug,
                });
                break;
            }

            case "organization.deleted": {
                const { id } = evt.data;

                logger.info("Processing organization.deleted", { clerkOrgId: id });

                await prisma.organization.delete({
                    where: { clerkOrganizationId: id },
                });

                logger.success("Organization deleted", { clerkOrgId: id });
                break;
            }

            case "organizationMembership.created":
            case "organizationMembership.updated": {
                const { organization, public_user_data, role } = evt.data;

                logger.info(`Processing organizationMembership ${eventType}`, {
                    clerkOrgId: organization.id,
                    clerkUserId: public_user_data.user_id,
                    role,
                });

                // Find user
                const user = await prisma.user.findUnique({
                    where: { clerkUserId: public_user_data.user_id },
                });

                if (!user) {
                    logger.error("User not found for organization membership", {
                        clerkUserId: public_user_data.user_id,
                    });
                    return new Response("User not found", { status: 404 });
                }

                // Find organization
                const org = await prisma.organization.findUnique({
                    where: { clerkOrganizationId: organization.id },
                });

                if (!org) {
                    logger.error("Organization not found for membership", {
                        clerkOrgId: organization.id,
                    });
                    return new Response("Organization not found", { status: 404 });
                }

                await prisma.organizationMember.upsert({
                    where: {
                        organizationId_userId: {
                            organizationId: org.id,
                            userId: user.id,
                        },
                    },
                    update: {
                        role: role || "viewer",
                    },
                    create: {
                        organizationId: org.id,
                        userId: user.id,
                        role: role || "viewer",
                    },
                });

                logger.success(`OrganizationMembership ${eventType} processed`, {
                    organizationId: org.id,
                    userId: user.id,
                });
                break;
            }

            case "organizationMembership.deleted": {
                const { organization, public_user_data } = evt.data;

                logger.info("Processing organizationMembership.deleted", {
                    clerkOrgId: organization.id,
                    clerkUserId: public_user_data.user_id,
                });

                const user = await prisma.user.findUnique({
                    where: { clerkUserId: public_user_data.user_id },
                });

                const org = await prisma.organization.findUnique({
                    where: { clerkOrganizationId: organization.id },
                });

                if (!user || !org) {
                    logger.warn("User or organization not found for membership deletion");
                    break;
                }

                await prisma.organizationMember.deleteMany({
                    where: {
                        organizationId: org.id,
                        userId: user.id,
                    },
                });

                logger.success("OrganizationMembership deleted", {
                    organizationId: org.id,
                    userId: user.id,
                });
                break;
            }

            default:
                logger.debug("Unhandled webhook event type", { eventType });
        }

        logger.logResponse(200, "Webhook processed successfully");
        return new Response("Webhook processed successfully", { status: 200 });
    } catch (error) {
        logger.error("Error processing webhook", error);
        logger.logResponse(500, "Webhook processing failed");

        return new Response("Error processing webhook", { status: 500 });
    }
}