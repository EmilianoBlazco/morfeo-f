"use client";

import { FC, useState } from "react";
import { Button } from "@components/ui/button";
import { Eye } from "lucide-react";
import { FilePreviewModal } from "@components/self/ui/data-table/file-preview-modal";
import { accept_justification } from "@/api/attendance/accept-justification";
import {toast} from "@/hooks/use-toast";
import {useHandleError} from "@/hooks/useHandleError";
import {reject_justification} from "@/api/attendance/reject-justification";

type ViewButtonProps = {
    fileUrl: string; // URL del archivo a mostrar
    justificationId: number; // ID del justificativo
};

export const ViewButton: FC<ViewButtonProps> = ({ fileUrl, justificationId }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const hanleError = useHandleError();

    const handleAccept = async () => {
        try {
            const { message } = await accept_justification(justificationId);
            toast({
                title: "Justificativo aceptado",
                description: message,
                variant: "succsess",
            });
            setModalOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            hanleError("accept_justification",error);
        }
    };

    const handleReject = async () => {
        try {
            const { message } = await reject_justification(justificationId);
            toast({
                title: "Justificativo rechazado",
                description: message,
                variant: "succsess",
            });
            setModalOpen(false);
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } catch (error) {
            hanleError("reject_justification", error);
        }
    };

    return (
        <>
            <Button className="h-8 w-8 p-0" onClick={() => setModalOpen(true)}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Ver archivo</span>
            </Button>

            {isModalOpen && (
                <FilePreviewModal
                    fileUrl={fileUrl}
                    onClose={() => setModalOpen(false)}
                    onAccept={handleAccept}
                    onReject={handleReject}
                />
            )}
        </>
    );
};