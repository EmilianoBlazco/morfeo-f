'use client'

import React from 'react'
import {QRCodeSVG} from 'qrcode.react'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {usePDF} from 'react-to-pdf'
import {Download, FileDown} from 'lucide-react'

export default function QRCodeView({qrData = "https://ejemplo.com/registro-exitoso"}) {
    const {toPDF, targetRef} = usePDF({filename: 'mi-codigo-qr.pdf'});

    const downloadQRImage = () => {
        const svg = document.getElementById("qr-code");
        if (!svg) {
            console.error("SVG element not found");
            return;
        }
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Failed to get canvas context");
            return;
        }

        const img = new Image();
        img.onload = () => {
            const scaleFactor = 7; // Calidad de la imagen
            canvas.width = img.width * scaleFactor;
            canvas.height = img.height * scaleFactor;
            ctx.scale(scaleFactor, scaleFactor);
            ctx.drawImage(img, 0, 0);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "mi-codigo-qr";
            downloadLink.href = pngFile;
            downloadLink.click();
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <div className="flex justify-center items-center">
            <Card className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden">
                <CardHeader className="bg-gray-900 text-white py-4">
                    <CardTitle className="text-xl sm:text-2xl font-bold text-center">Tu Código QR</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                    <div ref={targetRef}
                         className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="bg-white p-2 sm:p-4 rounded-xl shadow-inner border border-gray-200">
                            <QRCodeSVG
                                id="qr-code"
                                value={qrData}
                                size={150}
                                level="H"
                                marginSize={4}
                            />
                        </div>
                        <div className="flex flex-col space-y-3 w-full sm:w-1/2">
                            <p className="text-center sm:text-left text-sm text-gray-600 mb-2">
                                Descárgalo para usarlo más tarde.
                            </p>
                            <Button onClick={downloadQRImage}
                                    className="w-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-300 text-sm py-2">
                                <Download className="w-4 h-4 mr-2"/>
                                Descargar Imagen
                            </Button>
                            <Button onClick={() => toPDF()} variant="outline"
                                    className="w-full border-gray-300 text-gray-800 hover:bg-gray-100 transition-colors duration-300 text-sm py-2">
                                <FileDown className="w-4 h-4 mr-2"/>
                                Descargar PDF
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}