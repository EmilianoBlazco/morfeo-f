'use client';

import { FC, useState, useEffect } from "react";
import { Button } from "@components/ui/button";
import { Upload } from "lucide-react";
import { FileUpload } from "@components/self/ui/data-table/file-upload";
import { useAuth } from "@/context/AuthContext";

type UploadButtonProps = {
    attendanceId: number;
};

export const UploadButton: FC<UploadButtonProps> = ({ attendanceId }) => {
    const { user } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isFileUploaded, setFileUploaded] = useState(false); // Estado para saber si el archivo fue cargado

    useEffect(() => {
        // Si el estado es "Justificado", deshabilitamos el botón
        if (status === "Justificado") {
            setFileUploaded(true);
        }
    }, [status]);

    return (
        <>
            <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={() => setModalOpen(true)}
                disabled={isFileUploaded} // Deshabilitar si el archivo ya fue subido
            >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Subir archivo</span>
            </Button>

            {isModalOpen && (
                <FileUpload
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    attendanceId={attendanceId} // Pasar el ID de la asistencia
                    employeeId={Number(user?.id) || 0} // Asegurarse de que haya un `employeeId`
                    onFileUploaded={() => setFileUploaded(true)} // Pasar la función para cambiar el estado cuando el archivo se sube
                />
            )}
        </>
    );
};
