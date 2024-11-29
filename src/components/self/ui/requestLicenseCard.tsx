import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from 'lucide-react';
import {ScaleOnHover} from "@components/self/animations/scale-on-hover";

type License = {
    name: string;
    icon: React.ComponentType<{ className?: string }> | string;
    description: string;
    duration: string;
};

type RequestLicenseCardProps = {
    licenses: License[];
};

const RequestLicenseCard: React.FC<RequestLicenseCardProps> = ({ licenses }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
    };

    const handleFiles = (files: FileList) => {
        setUploadedFiles([files[0]]);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {licenses.map((license, index) => (
                <div key={index} className="transition-all duration-300 h-full flex flex-col justify-between">
                    <ScaleOnHover scale={1.05}>
                        <Card className="bg-white border border-gray-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <CardHeader className="p-6">
                            <CardTitle className="flex items-center text-black text-xl">
                                {license.icon && <license.icon className="mr-3 h-6 w-6" />}
                                {license.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 pt-0 flex-grow">
                            <CardDescription className="text-gray-600 text-base mb-4">
                                {license.description}
                            </CardDescription>
                            <p className="text-sm text-black"><strong>Duración:</strong> {license.duration}</p>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        onClick={() => {}}
                                        className="w-full bg-black hover:bg-gray-800 text-white border border-black transition-colors duration-300"
                                    >
                                        Solicitar
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-white border border-gray-300 sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="text-black text-2xl font-bold">Solicitar {license.name}</DialogTitle>
                                        <DialogDescription className="text-gray-600">
                                            Complete el formulario para solicitar su {license.name.toLowerCase()}.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="startDate" className="text-right">
                                                Fecha inicio
                                            </Label>
                                            <Input id="startDate" type="date" multiple={false} className="col-span-3" />
                                        </div>
                                        <div
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
                                                <Upload className="w-10 h-10 text-gray-400" />
                                                <p className="mt-2 text-sm text-gray-500">Arrastre y suelte archivos aquí o haga clic para seleccionar</p>
                                            </label>
                                        </div>
                                        {uploadedFiles.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="font-semibold mb-2">Archivo subido:</h4>
                                                <ul className="list-disc pl-5">
                                                    {uploadedFiles.map((file, index) => (
                                                        <li key={index} className="text-sm text-gray-600">{file.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="bg-black hover:bg-gray-800 text-white transition-colors duration-300">
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