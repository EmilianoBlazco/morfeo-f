'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, LogIn } from 'lucide-react'
import Particles from '@/components/self/animations/particles'
import { AnimatedClock } from '@/components/self/animations/animated-clock'
import { ScaleOnHover } from '@/components/self/animations/scale-on-hover'
import { FadeInAnimation } from '@/components/self/animations/fade-in-animation'
import { AnimatedLogo } from '@/components/self/animations/animated-logo'

export default function Page() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative">
            <Particles />

            <FadeInAnimation>
                <Card className="bg-white border border-gray-300 shadow-lg rounded-2xl w-full max-w-2xl">
                    <CardHeader className="text-center">
                        <FadeInAnimation initialY={-20} delay={0.3}>
                            <CardTitle className="text-2xl sm:text-4xl font-bold mb-3 text-black">Bienvenido a Morfeo S.A.</CardTitle>
                            <CardDescription className="text-lg sm:text-xl text-black/70">Sistema de Asistencia de Personal</CardDescription>
                        </FadeInAnimation>
                    </CardHeader>
                    <CardContent className="space-y-4 sm:space-y-6">
                        <FadeInAnimation delay={0.5}>
                            <AnimatedClock />
                        </FadeInAnimation>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-center sm:space-x-6 space-y-4 sm:space-y-0">
                        <ScaleOnHover>
                            <Button asChild size="lg" className="text-lg sm:text-xl px-8 py-6 bg-black text-white rounded-xl shadow-lg hover:bg-black/80">
                                <Link href="/login">
                                    <LogIn className="mr-2 h-6 w-6 sm:h-8 sm:w-8" /> Iniciar Sesión
                                </Link>
                            </Button>
                        </ScaleOnHover>
                        <ScaleOnHover>
                            <Button asChild size="lg" variant="outline" className="text-lg sm:text-xl px-8 py-6 border-black text-black rounded-xl shadow-lg hover:bg-gray-100">
                                <Link href="/register">
                                    <UserPlus className="mr-2 h-6 w-6 sm:h-8 sm:w-8" /> Registrarse
                                </Link>
                            </Button>
                        </ScaleOnHover>
                    </CardFooter>
                </Card>
            </FadeInAnimation>

            <AnimatedLogo text="Blazco - Cristaldo" />
        </div>
    )
}