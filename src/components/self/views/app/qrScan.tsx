'use client'

import { useState, useEffect, useRef } from 'react'
import { CameraDevice, Html5Qrcode } from 'html5-qrcode'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, QrCode, X } from "lucide-react"

export default function Component() {
    const [scanning, setScanning] = useState(false)
    const [result, setResult] = useState('')
    const videoContainerId = 'qr-reader'
    const { toast } = useToast()
    const videoRef = useRef<HTMLDivElement>(null)

    // Cargar el sonido de éxito
    useEffect(() => {
        const successSound = new Audio('/success.mp3')
        successSound.load()
        return () => {
            successSound.pause()
            successSound.src = ''
        }
    }, [])

    // Función para reproducir la voz con el texto escaneado
    const speakText = (text: string) => {
        const speech = new SpeechSynthesisUtterance(`Bienvenido. ${text}`)
        speech.lang = 'es-ES'
        speech.rate = 1
        speech.pitch = 1
        window.speechSynthesis.speak(speech)
    }

    // Función para iniciar el escaneo
    const startScan = async () => {
        try {
            const scanner = new Html5Qrcode(videoContainerId)
            setScanning(true)

            await scanner.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
                        const minDimension = Math.min(viewfinderWidth, viewfinderHeight)
                        return {
                            width: minDimension,
                            height: minDimension
                        }
                    }
                },
                (decodedText: string) => {
                    setResult(decodedText)
                    const successSound = new Audio('/success.mp3')
                    successSound.play().catch(console.error)
                    speakText(decodedText)
                    scanner.stop().then(() => setScanning(false)).catch(console.error)
                    toast({
                        description: "El código QR ha sido escaneado con éxito.",
                    })
                },
                (errorMessage: string) => {
                    console.error('QR no detectado:', errorMessage)
                }
            )

            // Ajustar el tamaño del contenedor de video después de iniciar el escaneo
            if (videoRef.current) {
                const videoElement = videoRef.current.querySelector('video')
                if (videoElement instanceof HTMLVideoElement) {
                    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
                        for (const entry of entries) {
                            const { height } = entry.contentRect
                            if (videoRef.current) {
                                videoRef.current.style.height = `${height}px`
                            }
                        }
                    })
                    resizeObserver.observe(videoElement)
                }
            }
        } catch (err) {
            console.error('Error al iniciar el escáner:', err)
            setScanning(false)
            toast({
                variant: "destructive",
                description: "Hubo un error al iniciar el escáner de QR.",
            })
        }
    }

    // Función para detener el escaneo
    const stopScan = () => {
        Html5Qrcode.getCameras()
            .then((devices: CameraDevice[]) => {
                if (devices.length > 0) {
                    const scanner = new Html5Qrcode(videoContainerId)
                    scanner.stop().catch((err: Error) => console.error('Error al detener el escáner:', err))
                }
            })
            .finally(() => setScanning(false))
        window.speechSynthesis.cancel() // Detener cualquier síntesis de voz en progreso
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
                    <Button onClick={stopScan} variant="destructive" className="w-full">
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
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="ml-2">Escaneando...</span>
                    </div>
                )}
                {result && (
                    <Card className="w-full mt-4">
                        <CardHeader>
                            <CardTitle className="text-lg">Resultado del Escaneo</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm break-all">{result}</p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    )
}
