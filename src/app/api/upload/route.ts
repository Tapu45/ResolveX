import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/ClientAdmin";
import { createLogger } from "@/lib/logger";
import { z } from "zod";
import { avatarUploadSchema, attachmentUploadSchema, UploadedFile, complaintAttachmentUploadSchema } from "@/types/upload";
import { prisma } from "@/lib/prisma/client";

const logger = createLogger("UploadAPI");

// ============ HELPER FUNCTIONS ============

/**
 * Generate unique file name
 */
function generateFileName(originalName: string, userId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 9);
    const extension = originalName.split(".").pop();
    return `${userId}-${timestamp}-${random}.${extension}`;
}

/**
 * Get file type category
 */
function getFileTypeCategory(mimeType: string): "image" | "video" | "document" {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    return "document";
}

/**
 * Validate user is member of workspace
 */
async function validateWorkspaceMember(userId: string, workspaceId: string) {
    const member = await prisma.workspaceMember.findUnique({
        where: {
            workspaceId_userId: {
                workspaceId,
                userId,
            },
        },
    });

    return !!member;
}

// ============ POST - Upload File ============

async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        logger.logRequest("POST", "/api/upload", userId ?? undefined);

        if (!userId) {
            logger.warn("Unauthorized upload attempt");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const uploadType = formData.get("uploadType") as string | null;
        const workspaceId = formData.get("workspaceId") as string | null;
        const complaintId = formData.get("complaintId") as string | null;

        logger.debug("Upload request received", {
            userId,
            uploadType,
            fileName: file?.name,
            fileSize: file?.size,
        });

        if (!file) {
            logger.warn("No file provided in upload request");
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!uploadType) {
            logger.warn("No upload type specified");
            return NextResponse.json({ error: "Upload type is required" }, { status: 400 });
        }

        // ============ AVATAR UPLOAD ============
        if (uploadType === "avatar") {
            try {
                logger.debug("Avatar upload initiated", { userId });

                // Validate file
                avatarUploadSchema.parse({ file });

                const fileName = generateFileName(file.name, userId);
                const folderPath = `${userId}/${fileName}`;

                logger.info("Uploading avatar to Supabase", { userId, fileName });

                // Upload to Supabase
                const { data, error } = await supabaseAdmin.storage
                    .from("avatars")
                    .upload(folderPath, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (error) {
                    logger.error("Supabase upload error", error);
                    throw new Error(error.message);
                }

                // Get public URL
                const { data: urlData } = supabaseAdmin.storage
                    .from("avatars")
                    .getPublicUrl(folderPath);

                const uploadedFile: UploadedFile = {
                    url: urlData.publicUrl,
                    path: folderPath,
                    bucket: "avatars",
                    fileName,
                    fileSize: file.size,
                    mimeType: file.type,
                };

                logger.success("Avatar uploaded successfully", {
                    userId,
                    fileName,
                    url: uploadedFile.url,
                });
                logger.logResponse(200, "Avatar uploaded successfully");

                return NextResponse.json(
                    {
                        success: true,
                        message: "Avatar uploaded successfully",
                        data: uploadedFile,
                    },
                    { status: 200 }
                );
            } catch (error) {
                if (error instanceof z.ZodError) {
                    logger.validationError("Avatar validation failed", error, { userId });
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

                logger.error("Avatar upload failed", error, { userId });
                return NextResponse.json(
                    { error: error instanceof Error ? error.message : "Avatar upload failed" },
                    { status: 500 }
                );
            }
        }

        // ============ ATTACHMENT UPLOAD ============
        if (uploadType === "attachment") {
            try {
                logger.debug("Attachment upload initiated", { userId, workspaceId });

                if (!workspaceId) {
                    logger.warn("Workspace ID required for attachment upload");
                    return NextResponse.json(
                        { error: "Workspace ID is required" },
                        { status: 400 }
                    );
                }

                // Validate workspace membership
                const isMember = await validateWorkspaceMember(userId, workspaceId);
                if (!isMember) {
                    logger.warn("User is not a member of workspace", { userId, workspaceId });
                    return NextResponse.json(
                        { error: "Access denied" },
                        { status: 403 }
                    );
                }

                // Validate file
                attachmentUploadSchema.parse({ file, workspaceId });

                const fileName = generateFileName(file.name, userId);
                const folderPath = `${workspaceId}/${userId}/${fileName}`;

                logger.info("Uploading attachment to Supabase", { workspaceId, fileName });

                // Upload to Supabase
                const { data, error } = await supabaseAdmin.storage
                    .from("attachments")
                    .upload(folderPath, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (error) {
                    logger.error("Supabase upload error", error);
                    throw new Error(error.message);
                }

                // Get public URL
                const { data: urlData } = supabaseAdmin.storage
                    .from("attachments")
                    .getPublicUrl(folderPath);

                const uploadedFile: UploadedFile = {
                    url: urlData.publicUrl,
                    path: folderPath,
                    bucket: "attachments",
                    fileName,
                    fileSize: file.size,
                    mimeType: file.type,
                };

                logger.success("Attachment uploaded successfully", {
                    workspaceId,
                    fileName,
                    url: uploadedFile.url,
                });
                logger.logResponse(200, "Attachment uploaded successfully");

                return NextResponse.json(
                    {
                        success: true,
                        message: "Attachment uploaded successfully",
                        data: uploadedFile,
                    },
                    { status: 200 }
                );
            } catch (error) {
                if (error instanceof z.ZodError) {
                    logger.validationError("Attachment validation failed", error, { userId });
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

                logger.error("Attachment upload failed", error, { userId });
                return NextResponse.json(
                    { error: error instanceof Error ? error.message : "Attachment upload failed" },
                    { status: 500 }
                );
            }
        }

        // ============ COMPLAINT ATTACHMENT UPLOAD ============
        if (uploadType === "complaint") {
            try {
                logger.debug("Complaint attachment upload initiated", { userId, workspaceId, complaintId });

                if (!workspaceId) {
                    logger.warn("Workspace ID required for complaint upload");
                    return NextResponse.json(
                        { error: "Workspace ID is required" },
                        { status: 400 }
                    );
                }

                // Validate workspace membership
                const isMember = await validateWorkspaceMember(userId, workspaceId);
                if (!isMember) {
                    logger.warn("User is not a member of workspace", { userId, workspaceId });
                    return NextResponse.json(
                        { error: "Access denied" },
                        { status: 403 }
                    );
                }

                // Validate file
                complaintAttachmentUploadSchema.parse({
                    file,
                    workspaceId,
                    complaintId,
                });

                const fileName = generateFileName(file.name, userId);
                const folderPath = `${workspaceId}/${complaintId || "temp"}/${fileName}`;

                logger.info("Uploading complaint attachment to Supabase", { workspaceId, fileName });

                // Upload to Supabase
                const { data, error } = await supabaseAdmin.storage
                    .from("complaints")
                    .upload(folderPath, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (error) {
                    logger.error("Supabase upload error", error);
                    throw new Error(error.message);
                }

                // Get public URL
                const { data: urlData } = supabaseAdmin.storage
                    .from("complaints")
                    .getPublicUrl(folderPath);

                const uploadedFile: UploadedFile = {
                    url: urlData.publicUrl,
                    path: folderPath,
                    bucket: "complaints",
                    fileName,
                    fileSize: file.size,
                    mimeType: file.type,
                };

                logger.success("Complaint attachment uploaded successfully", {
                    workspaceId,
                    fileName,
                    url: uploadedFile.url,
                });
                logger.logResponse(200, "Complaint attachment uploaded successfully");

                return NextResponse.json(
                    {
                        success: true,
                        message: "Complaint attachment uploaded successfully",
                        data: uploadedFile,
                    },
                    { status: 200 }
                );
            } catch (error) {
                if (error instanceof z.ZodError) {
                    logger.validationError("Complaint attachment validation failed", error, {
                        userId,
                    });
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

                logger.error("Complaint attachment upload failed", error, { userId });
                return NextResponse.json(
                    { error: error instanceof Error ? error.message : "Complaint attachment upload failed" },
                    { status: 500 }
                );
            }
        }

        // Unknown upload type
        logger.warn("Unknown upload type", { uploadType });
        return NextResponse.json(
            { error: "Invalid upload type" },
            { status: 400 }
        );
    } catch (error) {
        logger.error("Upload endpoint error", error);
        logger.logResponse(500, "Upload failed");

        return NextResponse.json(
            { error: "Upload failed" },
            { status: 500 }
        );
    }
}

export { POST };