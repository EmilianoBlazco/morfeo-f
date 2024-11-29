'use client'

import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, Loader2, QrCode, X } from 'lucide-react'
import { attendanceUser } from "@/api/attendance/attendance"
import { AttendanceType } from "@/types"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AlertDescription } from "@components/ui/alert"
import { useHandleError } from "@/hooks/useHandleError"

export default function QRScannerComponent() {
    const [scanning, setScanning] = useState(false)
    const [scanStatus, setScanStatus] = useState<'success' | 'error' | 'scanning' | 'idle' | 'confirmation'>('idle')
    const [scannedData, setScannedData] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const videoContainerId = 'qr-reader'
    const { toast } = useToast()
    const handleError = useHandleError()
    const scannerRef = useRef<Html5Qrcode | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current || undefined)
            scannerRef.current?.stop().catch(console.error)
        }
    }, [])

    const speakText = (text: string, isEntry: boolean) => {
        const { name } = JSON.parse(text)
        const message = isEntry ? `Bienvenido ${name}` : `Hasta luego ${name}`
        const speech = new SpeechSynthesisUtterance(message)
        Object.assign(speech, { lang: 'es-ES', rate: 1, pitch: 1 })
        window.speechSynthesis.speak(speech)
    }

    const isValidQRFormat = (text: string): boolean => {
        try {
            const data = JSON.parse(text)
            return ['id', 'dni', 'name'].every(key => key in data)
        } catch {
            return false
        }
    }

    const resetScanState = () => {
        setScannedData(null)
        setScanStatus('scanning')
        scannerRef.current?.resume()
    }

    const processQRCodeConfirmation = async (confirm: boolean) => {
        setIsDialogOpen(false)

        if (!confirm || !scannedData) {
            toast({ description: "Escaneo cancelado.", className: "bg-yellow-500 text-white" })
            return resetScanState()
        }

        try {
            const data = JSON.parse(scannedData)
            const response = await attendanceUser({
                user_id: data.id,
                scan_time: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires', hour12: false }),
            } as AttendanceType)

            const isExit = response.data.data.exit_time
            speakText(scannedData, !isExit)
            setScanStatus('success')
            toast({ description: `${isExit ? 'Salida' : 'Entrada'} registrada correctamente.` })
        } catch (error: unknown) {
            handleError('attendance', error)
        } finally {
            timeoutRef.current = setTimeout(resetScanState, 5000)
        }
    }

    const processQRCode = (decodedText: string) => {
        scannerRef.current?.pause(true)
        if (isValidQRFormat(decodedText)) {
            setScannedData(decodedText)
            setScanStatus('confirmation')
            setIsDialogOpen(true)
        } else {
            setScanStatus('error')
            timeoutRef.current = setTimeout(resetScanState, 5000)
        }
    }

    const toggleScan = async (start: boolean) => {
        if (!scannerRef.current) scannerRef.current = new Html5Qrcode(videoContainerId)

        if (start) {
            setScanning(true)
            setScanStatus('scanning')
            try {
                await scannerRef.current.start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: size => ({ width: size, height: size }) },
                    processQRCode,
                    console.error
                )
            } catch (err) {
                console.error('Error al iniciar el escáner:', err)
                setScanning(false)
                toast({ variant: "destructive", description: "Hubo un error al iniciar el escáner de QR." })
            }
        } else {
            await scannerRef.current?.stop().catch(console.error)
            setScanning(false)
            setScanStatus('idle')
            window.speechSynthesis.cancel()
            clearTimeout(timeoutRef.current || undefined)
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Escáner de Código QR</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <Button onClick={() => toggleScan(!scanning)} className="w-full">
                    {scanning ? <><X className="mr-2 h-4 w-4" /> Detener Escaneo</> : <><QrCode className="mr-2 h-4 w-4" /> Escanear Código QR</>}
                </Button>
                <div id={videoContainerId} className={`w-full bg-black ${scanning ? '' : 'hidden'}`} />
                {scanning && (
                    <div className="flex items-center justify-center">
                        {scanStatus === 'scanning' && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                        {scanStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mr-2" />}
                        {scanStatus === 'error' && <XCircle className="h-4 w-4 text-red-500 mr-2" />}
                    </div>
                )}
            </CardContent>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Escaneo</AlertDialogTitle>
                        <AlertDescription>¿Desea registrar sus asistencia?</AlertDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => processQRCodeConfirmation(false)}>Rechazar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => processQRCodeConfirmation(true)}>Aceptar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}