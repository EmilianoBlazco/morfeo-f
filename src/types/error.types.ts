import { z } from "zod";

// Define el esquema para el error HTTP
export const ErrorResponseSchema = z.object({
    response: z.object({
        status: z.number(),
        data: z.object({
            message: z.string().optional(), // El mensaje opcional de error proporcionado por la API
        }).optional(),
    }).optional(),
});

// Extrae el tipo a partir del esquema
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
