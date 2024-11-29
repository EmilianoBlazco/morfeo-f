import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Calendar, Clock, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import {useToast} from "@/hooks/use-toast";

type License = {
    type: string;
    startDate: Date;
    endDate: Date;
};

type CurrentLicenseCardProps = {
    currentLicenses: License[];
};

const CurrentLicenseCard: React.FC<CurrentLicenseCardProps> = ({ currentLicenses }) => {
    const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
    const { toast } = useToast()

    const calculateDaysRemaining = (startDate: Date, endDate: Date) => {
        const today = new Date();
        const daysLeft = Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
        const totalLicenseDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const progressPercentage = Math.min(100, Math.round((totalLicenseDays - daysLeft) / totalLicenseDays * 100));

        return { daysLeft, progressPercentage };
    };

    const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const validExtensions = ['.pdf', '.jpg', '.jpeg', '.png'];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();

            if (fileExtension && validExtensions.includes(`.${fileExtension}`)) {
                setUploadedDocument(file);
            } else {
                // limpiar el input
                e.target.value = '';
                toast({
                    variant: "destructive",
                    description: "Capo no podes subir este tipo de archivos"
                });
            }
        }
    };

    return (
        <>
            {currentLicenses.map((license, index) => {
                const licenseDetails = calculateDaysRemaining(license.startDate, license.endDate);
                const isSicknessLicense = license.type === "Licencia por Enfermedad";
                const exceeds30Days = Math.ceil((license.endDate.getTime() - license.startDate.getTime()) / (1000 * 60 * 60 * 24)) > 30;

                return (
                    <Card key={index} className="mb-4 bg-white border border-gray-300 shadow-md">
                        <CardHeader className="flex flex-row items-center justify-start">
                            <CardTitle className="text-xl font-bold text-black flex items-center gap-2 mr-auto">
                                <CheckCircle className="text-gray-600" />
                                {license.type}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center text-gray-600 space-x-2">
                                            <Calendar size={16} />
                                            <span>Vence el: {license.endDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Clock className="mr-2" />
                                        <span className="font-bold">{licenseDetails.daysLeft} días</span>
                                    </div>
                                </div>

                                <Progress
                                    value={licenseDetails.progressPercentage}
                                    className="w-full h-2 bg-gray-200"
                                />

                                <div className="text-sm text-gray-600 flex justify-between">
                                    <span>{license.startDate.toLocaleDateString()}</span>
                                    <span>{license.endDate.toLocaleDateString()}</span>
                                </div>
                            </div>

                            {isSicknessLicense && exceeds30Days && (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 1 }}
                                    animate={{
                                        scale: [1, 1.01, 1],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Infinity,
                                        repeatType: "mirror",
                                    }}
                                    className={`mt-6 p-6 border border-gray-300 rounded-lg bg-white shadow-sm relative ${
                                        !uploadedDocument ? "" : ""
                                    }`}
                                >
                                    <Label
                                        htmlFor={`upload-${index}`}
                                        className="text-gray-800 font-medium text-sm mb-2 flex items-center gap-2"
                                    >
                                        <Upload className="w-5 h-5 text-gray-600" />
                                        Subir comprobante de alta médica
                                    </Label>
                                    <Input
                                        id={`upload-${index}`}
                                        type="file"
                                        accept={".pdf,.jpg,.jpeg,.png"}
                                        onChange={handleDocumentUpload}
                                        multiple={false}
                                        className="border border-gray-300 bg-gray-50 p-2 rounded-md focus:outline-none focus:ring focus:ring-gray-200 transition"
                                    />
                                    {uploadedDocument ? (
                                        <p className="mt-3 text-sm text-gray-700 font-semibold flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-gray-700" />
                                            Archivo cargado: {uploadedDocument.name}
                                        </p>
                                    ) : (
                                        <p className="absolute top-2 right-4 text-xs text-gray-400 italic">
                                            Asegúrese de cargar un archivo válido
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </>
    );
};

export default CurrentLicenseCard;