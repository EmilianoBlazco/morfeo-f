'use client'

import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Loader2, QrCode, X } from "lucide-react"
import { attendanceUser } from "@/api/attendance/attendance"
import { AttendanceType } from "@/types"

export default function QRScannerComponent() {
    const [scanning, setScanning] = useState(false)
    const [scanStatus, setScanStatus] = useState<'success' | 'error' | 'scanning' | 'idle'>('idle')
    const videoContainerId = 'qr-reader'
    const { toast } = useToast()
    const videoRef = useRef<HTMLDivElement>(null)
    const scannerRef = useRef<Html5Qrcode | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    type ErrorResponse = {
        response?: {
            status?: number;
            data?: {
                error?: string;
            };
        };
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            if (scannerRef.current) {
                scannerRef.current.stop().catch(console.error)
            }
        }
    }, [])

    const speakText = (text: string, entry: boolean) => {
        const data = JSON.parse(text);
        let name = '';

        if (entry) {
            name = `Bienvenido ${data.name}`;
        } else if (!entry) {
            name = `Hasta luego ${data.name}`;
        }

        if (name) {
            const speech = new SpeechSynthesisUtterance(name);
            speech.lang = 'es-ES';
            speech.rate = 1;
            speech.pitch = 1;
            window.speechSynthesis.speak(speech);
        }
    };

    const isValidQRFormat = (text: string) => {
        try {
            const data = JSON.parse(text)
            return data && typeof data.id !== 'undefined' && typeof data.dni !== 'undefined' && typeof data.name !== 'undefined'
        } catch {
            return false
        }
    }

    const processQRCode = async (decodedText: string) => {
        scannerRef.current?.pause(true)

        if (isValidQRFormat(decodedText)) {

            const data = JSON.parse(decodedText)
            const attendanceData: AttendanceType = {
                user_id: data.id,
                scan_time: new Date().toLocaleString('es-AR', {
                    timeZone: 'America/Argentina/Buenos_Aires',
                    hour12: false
                }),
            }

            try {
                const response = await attendanceUser(attendanceData);
                setScanStatus('success');

                const isExit = response.data.data.exit_time;
                speakText(decodedText, !isExit);

                toast({
                    description: `${isExit ? 'Salida' : 'Entrada'} registrada correctamente.`
                });
            } catch (error) {
                const errorResponse = (error as ErrorResponse).response;

                if (errorResponse?.status === 400) {
                    toast({
                        description: errorResponse?.data?.error || "Ya existe una entrada para el usuario.",
                        className: "bg-yellow-500 text-white"
                    });
                } else {
                    toast({
                        variant: "destructive",
                        description: "Hubo un error al registrar la asistencia."
                    });
                }
            }

        } else {
            setScanStatus('error')
        }

        timeoutRef.current = setTimeout(() => {
            setScanStatus('scanning')
            scannerRef.current?.resume()
        }, 4000)
    }

    const startScan = async () => {
        if (!scannerRef.current) {
            scannerRef.current = new Html5Qrcode(videoContainerId)
        }

        try {
            setScanning(true)
            setScanStatus('scanning')

            await scannerRef.current.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
                        const minDimension = Math.min(viewfinderWidth, viewfinderHeight)
                        return { width: minDimension, height: minDimension }
                    }
                },
                processQRCode,
                () => {} // Ignorar errores de detección de QR
            )
        } catch (err) {
            console.error('Error al iniciar el escáner:', err)
            setScanning(false)
            toast({
                variant: "destructive",
                description: "Hubo un error al iniciar el escáner de QR.",
            })
        }
    }

    const stopScan = () => {
        if (scannerRef.current) {
            scannerRef.current.stop()
                .then(() => {
                    setScanning(false)
                    setScanStatus('idle')
                    window.speechSynthesis.cancel()
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current)
                    }
                })
                .catch((err: Error) => {
                    console.error('Error al detener el escáner:', err)
                })
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Escáner de Código QR</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                {!scanning ? (
                    <Button onClick={startScan} className="w-full">
                        <QrCode className="mr-2 h-4 w-4" /> Escanear Código QR
                    </Button>
                ) : (
                    <Button onClick={stopScan}  className="w-full">
                        <X className="mr-2 h-4 w-4" /> Detener Escaneo
                    </Button>
                )}
                <div
                    id={videoContainerId}
                    ref={videoRef}
                    className={`w-full bg-black ${scanning ? '' : 'hidden'}`}
                ></div>
                {scanning && (
                    <div className="flex items-center justify-center">
                        {scanStatus === 'scanning' && (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                <span className="text-sm">Escaneando...</span>
                            </>
                        )}
                        {scanStatus === 'success' && (
                            <div className="flex items-center text-green-500">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                <span className="text-sm">Escaneo exitoso</span>
                            </div>
                        )}
                        {scanStatus === 'error' && (
                            <div className="flex items-center text-red-500">
                                <XCircle className="h-4 w-4 mr-2" />
                                <span className="text-sm">QR inválido</span>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}