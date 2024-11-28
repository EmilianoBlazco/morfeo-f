'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { ChangeEvent, FC, useState } from "react";
import { justif_upload } from "@/api/attendance/justify-upload";
import { justifyUploadSchema } from "@/types/justifies-uploads.types";
import { toast } from "@/hooks/use-toast";
import { useHandleError } from "@/hooks/useHandleError";

interface FileUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    attendanceId: number;
    employeeId: number;
    onFileUploaded: () => void;  // Función que se llama cuando el archivo es subido correctamente
}

export const FileUpload: FC<FileUploadModalProps> = ({ isOpen, onClose, attendanceId, employeeId, onFileUploaded }) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const handleError = useHandleError();

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setSelectedFiles(files);
    };

    const handleSubmit = async () => {
        if (!selectedFiles.length) {
            toast({ title: "Error", description: "Debes seleccionar al menos un archivo.", variant: "destructive" });
            return;
        }

        // Validar archivos antes de enviar
        const validation = justifyUploadSchema.safeParse({
            attendance_id: attendanceId,
            employee_id: employeeId,
            files: selectedFiles,
        });

        if (!validation.success) {
            toast({
                title: "Error de validación",
                description: validation.error.errors.map((e) => e.message).join(", "),
                variant: "destructive",
            });
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append("attendance_id", attendanceId.toString());
            formData.append("employee_id", employeeId.toString());

            selectedFiles.forEach((file, index) => {
                formData.append(`files[${index}]`, file);
            });

            const { data } = await justif_upload(formData);
            toast({ title: "Comprobante cargado correctamente", description: data.message});

            onFileUploaded();  // Llamar la función para actualizar el estado en UploadButton

            onClose();
        } catch (error) {
            console.error("Error al subir el archivo:", error);
            handleError("upload", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full h-auto">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Subir archivo</DialogTitle>
                </DialogHeader>

                <div className="p-4 border border-dashed rounded-md bg-gray-100">
                    <input
                        type="file"
                        accept="image/*,application/pdf"
                        multiple // Permitir múltiples archivos
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
                    />
                </div>

                <DialogFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={!selectedFiles.length || isUploading}
                        className="mr-2"
                    >
                        {isUploading ? "Subiendo..." : "Enviar archivo"}
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Cancelar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
