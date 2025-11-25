import { z } from "zod";

// Avatar upload constraints
export const avatarUploadSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "Avatar file must be less than 5MB",
        })
        .refine(
            (file) => ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type),
            {
                message: "Avatar must be an image (JPEG, PNG, GIF, or WebP)",
            }
        ),
});

// Attachment upload constraints
export const attachmentUploadSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 50 * 1024 * 1024, {
            message: "Attachment file must be less than 50MB",
        })
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                    "video/mp4",
                    "video/quicktime",
                    "application/pdf",
                ].includes(file.type),
            {
                message: "Attachment must be an image, video, or PDF",
            }
        ),
    workspaceId: z.string().uuid("Invalid workspace ID"),
});

// Complaint attachment upload constraints
export const complaintAttachmentUploadSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= 100 * 1024 * 1024, {
            message: "Complaint attachment must be less than 100MB",
        })
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                    "video/mp4",
                    "video/quicktime",
                    "application/pdf",
                ].includes(file.type),
            {
                message: "Attachment must be an image, video, or PDF",
            }
        ),
    workspaceId: z.string().uuid("Invalid workspace ID"),
    complaintId: z.string().uuid("Invalid complaint ID").optional(),
});

// File metadata
export interface UploadedFile {
    url: string;
    path: string;
    bucket: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
}