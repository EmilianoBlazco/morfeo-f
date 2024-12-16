import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
//import { Upload } from 'lucide-react';
import { ScaleOnHover } from "@components/self/animations/scale-on-hover";
import {create_license, get_licenses} from "@/api/license/licenses";
import { SkeletonCardList } from "@components/self/ui/skeletons/skeleton-card";
import {Calendar} from "@components/ui/calendar";
import {toast} from "@/hooks/use-toast";
import {JustifyFiles} from "@/types/justifies-uploads.types";
import {z} from "zod";
import {useHandleError} from "@/hooks/useHandleError";

type License = {
    id : string;
    name: string;
    description: string;
    max_duration_days: number;
    annual_limit?: number;
    advance_notice_days?: number;
    requires_justification: boolean;
    required_documents: string | string[];
    created_at: Date;
    icon?: React.ComponentType<{ className?: string }> | string;
};

const RequestLicenseCard = () => {
    const [licenses, setLicenses] = useState<License[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [licensesCount, setLicensesCount] = useState<number>(7);
    //const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedLicenseId, setSelectedLicenseId] = useState<string | null>(null); // Estado para la licencia seleccionada
    const handleError = useHandleError();

    useEffect(() => {
        const fetchLicenses = async () => {
            try {
                const { licenses, licenses_count } = await get_licenses();
                setLicensesCount(licenses_count);
                setLicenses(licenses);
                console.log("Licencias cargadas:", licenses);
            } catch (error) {
                console.error("Error al cargar las licencias:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLicenses();
    }, []);

    if (isLoading) {
        return <SkeletonCardList count={licensesCount} />;
    }

    const handleSubmit = async () => {

        if (!selectedDate) {
            toast({
                title: "Error",
                description: "Debes seleccionar una fecha.",
                variant: "destructive",
            });
            return;
        }

        if (!uploadedFiles.length) {
            toast({
                title: "Error",
                description: "Debes subir un archivo.",
                variant: "destructive",
            });
            return;
        }

        try {
            JustifyFiles.parse({ files: uploadedFiles }); // Esta validación arrojará un error si los archivos no son válidos

            const formData = new FormData();
            formData.append("license_id", selectedLicenseId ?? "");
            formData.append("start_date", selectedDate.toISOString()); // La fecha se convierte a ISO string
            uploadedFiles.forEach((file, index) => {
                formData.append(`file_${index}`, file);
            });

            const response = await create_license(formData);

            if (response) {
                toast({
                    title: "Éxito",
                    description: "Solicitud de licencia enviada con éxito.",
                    variant: "succsess",
                });
            }

            console.log("Info",
                formData
            )

        } catch (error) {
            if (error instanceof z.ZodError) {
                toast({
                    title: "Error",
                    description: error.errors[0].message, // Muestra el primer error de validación
                    variant: "destructive",
                });
            } else {
                handleError("upload", error);
            }
        }
    };
/*
    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };*/

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUploadedFiles([e.target.files[0]]);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {licenses.map((license, index) => (
                <div key={index} className="transition-all duration-300 h-full flex flex-col justify-between">
                    <ScaleOnHover scale={1.05}>
                        <Card className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-h-[300px] flex flex-col justify-between">
                            <CardHeader className="p-6 flex flex-col gap-2">
                                <CardTitle className="flex items-center text-black text-2xl font-semibold">
                                    {license.icon && <license.icon className="mr-3 h-8 w-8" />}
                                    {license.name}
                                </CardTitle>
                                <p className="text-sm text-gray-500">{license.description}</p>
                            </CardHeader>
                            <CardContent className="px-6 py-4 flex-grow">
                                <p className="text-base text-black font-medium">
                                    <strong>Duración: {license.max_duration_days} días</strong>
                                </p>
                                {license.annual_limit && (
                                    <p className="text-sm text-gray-600 mb-2">
                                        <strong>Límite anual: </strong>{license.annual_limit} solicitudes
                                    </p>
                                )}
                                {license.required_documents && (
                                    <div className="mt-2">
                                        <p className="font-semibold text-sm text-gray-600">Documentos requeridos:</p>
                                        <ul className="list-disc pl-5 text-sm text-gray-600">
                                            {Array.isArray(license.required_documents)
                                                ? license.required_documents.map((document: string, index: number) => (
                                                    <li key={index}>{document}</li>
                                                ))
                                                : license.required_documents.split(",").map((document: string, index: number) => (
                                                    <li key={index}>{document.trim()}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="p-6 pt-0">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full bg-gray-400 text-white border border-gray-400 rounded-lg transition-all duration-300 shadow-md hover:brightness-90 hover:shadow-lg"
                                            onClick={() => setSelectedLicenseId(license.id)} // Establecer el ID de la licencia seleccionada
                                        >
                                            Solicitar
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-white border border-gray-200 sm:max-w-[600px] p-6">
                                        <DialogHeader>
                                            <DialogTitle className="text-black text-2xl font-semibold text-center">Solicitar {license.name}</DialogTitle>
                                            <DialogDescription className="text-gray-600 text-sm text-center">
                                                Complete el formulario para solicitar su {license.name.toLowerCase()}.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                {/*<Label htmlFor="startDate" className="text-left">
                                                    Fecha inicio
                                                </Label>*/}
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate ?? undefined}
                                                    onSelect={(date: Date | undefined) => setSelectedDate(date ?? null)} // Asegúrate de que no sea undefined
                                                    disabled={date => date < new Date()}
                                                    initialFocus
                                                />
                                            </div>
                                            {/*<div
                                                className={`p-4 mt-4 border-2 border-dashed rounded-lg ${dragActive ? 'border-black bg-gray-100' : 'border-gray-300'}`}
                                                onDragEnter={handleDrag}
                                                onDragLeave={handleDrag}
                                                onDragOver={handleDrag}
                                                onDrop={handleDrop}
                                            >
                                                <input
                                                    type="file"
                                                    id="file-upload"
                                                    multiple={false}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                                                    <Upload className="w-12 h-12 text-gray-400" />
                                                    <p className="mt-2 text-sm text-gray-500">Arrastre y suelte archivos aquí o haga clic para seleccionar</p>
                                                </label>
                                            </div>*/}
                                            <div className="p-4 border border-dashed rounded-md bg-gray-100">
                                                <input
                                                    type="file"
                                                    accept="image/*,application/pdf"
                                                    onChange={handleFileChange}
                                                    className="w-full text-sm text-gray-700 border border-gray-300 rounded-md p-2"
                                                />
                                            </div>
                                            {/*{uploadedFiles.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="font-semibold mb-2">Archivo subido:</h4>
                                                    <ul className="list-disc pl-5 text-sm text-gray-600">
                                                        {uploadedFiles.map((file, index) => (
                                                            <li key={index}>{file.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}*/}
                                        </div>
                                        <DialogFooter>
                                            <Button
                                                type="submit"
                                                className="bg-black hover:bg-gray-800 text-white transition-colors duration-300"
                                                onClick={handleSubmit}
                                            >
                                            Enviar solicitud
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    </ScaleOnHover>
                </div>
            ))}
        </div>
    );
};

export default RequestLicenseCard;