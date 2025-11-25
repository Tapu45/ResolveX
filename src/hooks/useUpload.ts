import { useState, useCallback } from "react";
import { UploadedFile } from "@/types/upload";
import { createLogger } from "@/lib/logger";

const logger = createLogger("useFileUpload");

interface UseFileUploadOptions {
    uploadType: "avatar" | "attachment" | "complaint";
    workspaceId?: string;
    complaintId?: string;
}

interface UseFileUploadReturn {
    upload: (file: File) => Promise<UploadedFile>;
    isLoading: boolean;
    error: string | null;
    progress: number;
}

export function useFileUpload({
    uploadType,
    workspaceId,
    complaintId,
}: UseFileUploadOptions): UseFileUploadReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const upload = useCallback(
        async (file: File): Promise<UploadedFile> => {
            try {
                setIsLoading(true);
                setError(null);
                setProgress(0);

                logger.debug("Starting file upload", {
                    uploadType,
                    fileName: file.name,
                    fileSize: file.size,
                });

                const formData = new FormData();
                formData.append("file", file);
                formData.append("uploadType", uploadType);

                if (workspaceId) {
                    formData.append("workspaceId", workspaceId);
                }

                if (complaintId) {
                    formData.append("complaintId", complaintId);
                }

                // Create XMLHttpRequest for progress tracking
                const xhr = new XMLHttpRequest();

                // Track upload progress
                xhr.upload.addEventListener("progress", (event) => {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        setProgress(percentComplete);
                        logger.debug("Upload progress", { percentComplete });
                    }
                });

                // Setup promise
                const response = await new Promise<Response>((resolve, reject) => {
                    xhr.addEventListener("load", () => {
                        if (xhr.status >= 200 && xhr.status < 300) {
                            resolve(new Response(xhr.responseText, { status: xhr.status }));
                        } else {
                            reject(new Error(`Upload failed with status ${xhr.status}`));
                        }
                    });

                    xhr.addEventListener("error", () => {
                        reject(new Error("Upload failed"));
                    });

                    xhr.open("POST", "/api/upload");
                    xhr.send(formData);
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Upload failed");
                }

                const data = await response.json();

                logger.success("File uploaded successfully", {
                    uploadType,
                    fileName: file.name,
                    url: data.data.url,
                });

                setProgress(100);
                setIsLoading(false);

                return data.data as UploadedFile;
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Upload failed";
                logger.error("File upload failed", err);
                setError(errorMessage);
                setIsLoading(false);
                throw err;
            }
        },
        [uploadType, workspaceId, complaintId]
    );

    return { upload, isLoading, error, progress };
}