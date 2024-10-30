// useHandleError.ts
'use client';

import { toast } from "@/hooks/use-toast";
import { ErrorResponseSchema } from "@/types/error.types";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useHandleError = () => {
    const router = useRouter();

    return useCallback((action: string, error: unknown) => {
        let message = "El servicio no está disponible en este momento. Inténtalo más tarde.";

        const parsedError = ErrorResponseSchema.safeParse(error);

        if (parsedError.success && parsedError.data.response) {
            const { response } = parsedError.data;

            if (response.data?.message) {
                message = response.data.message;
            } else {
                const status = response.status;

                switch (status) {
                    case 400:
                        router.push("/bad-request");
                        break;
                    case 401:
                        if (action === "login") {
                            message = "Las credenciales proporcionadas no son válidas.";
                        } else if (action === "register") {
                            message = "No tienes autorización para registrarte.";
                        } else if (action === "logout") {
                            message = "Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.";
                        }
                        break;
                    case 403:
                        router.push("/permission-denied");
                        break;
                    case 404:
                        router.push("/not-found");
                        break;
                    case 409:
                        if (action === "register") {
                            message = "El correo electrónico ya está en uso. Por favor, utiliza otro.";
                        }
                        break;
                    case 422:
                        if (action === "login") {
                            message = "Error de validación. Verifica tus datos.";
                        }
                        if (action === "register") {
                            message = "Los datos proporcionados son inválidos, o el correo electrónico ya está en uso.";
                        }
                        if (action === "forgotPassword") {
                            message = "El correo electrónico proporcionado no es válido o ya solicitaste un enlace de recuperación.";
                        }
                        break;
                    case 429:
                        if (action === "login" || action === "forgotPassword") {
                            message = "Demasiados intentos. Por favor, espera e inténtalo de nuevo.";
                        }
                        break;
                    default:
                        if (status >= 500 && status < 600) {
                            router.push("/internal-server-error");
                        } else {
                            message = response.data?.message || message;
                        }
                        break;
                }
            }
        } else if (error instanceof Error) {
            message = error.message;
        }

        toast({
            title: "Error",
            description: message,
            variant: "destructive",
            duration: 5000,
        });
    }, [router]);
};