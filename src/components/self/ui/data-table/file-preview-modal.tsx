"use client";

import React from "react";
import Image from "next/image";
import {ArrowLeft, Check, X} from "lucide-react";

interface FilePreviewModalProps {
    fileUrl: string,
    onClose: () => void,
    onAccept: () => void,
    onReject: () => void,
    status?: string
}

export const FilePreviewModal: React.FC<FilePreviewModalProps> = ({
                                                                      fileUrl,
                                                                      onClose,
                                                                      onAccept,
                                                                      onReject,
                                                                  }) => {
    const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(fileUrl);
    const isPDF = /\.pdf$/i.test(fileUrl);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
                className={`bg-white rounded-lg shadow-lg relative flex flex-col items-center ${
                    isImage ? "max-w-screen-sm" : isPDF ? "max-w-screen-lg w-full" : "max-w-md"
                } p-6`}
            >
                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-black"
                >
                    <ArrowLeft className="w-5 h-5 mr-1"/>
                    <span className="text-sm font-medium">Cerrar</span>
                </button>

                <h2 className="text-xl font-bold mb-4">Previsualización</h2>

                <div className="flex-grow w-full flex justify-center items-center">
                    {isImage && (
                        <Image
                            src={fileUrl}
                            alt="Preview"
                            width={500}
                            height={500}
                            className="max-h-96 object-contain"
                        />
                    )}
                    {isPDF && (
                        <iframe
                            src={fileUrl}
                            title="PDF Preview"
                            className="w-full h-[80vh] border-none"
                        ></iframe>
                    )}
                    {!isImage && !isPDF && (
                        <p className="text-center">Formato de archivo no soportado</p>
                    )}
                </div>

                {/* Botones Aceptar y Rechazar */}
                <div className="mt-4 flex justify-between w-full">
                    <button
                        onClick={onReject}
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        <X className="w-5 h-5 mr-2"/>
                        Rechazar
                    </button>
                    <button
                        onClick={onAccept}
                        className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        <Check className="w-5 h-5 mr-2"/>
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};