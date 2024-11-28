import { z } from "zod";

export const justifyUploadSchema = z.object({
    attendance_id: z
        .number(),
    employee_id: z
        .number(),
    files: z
        .array(
            z.instanceof(File).refine(
                (file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
                {
                    message: "Los archivos deben ser imágenes JPG, PNG o un archivo PDF.",
                }
            ).refine(
                (file) => file.size <= 10 * 1024 * 1024,
                { message: "El tamaño máximo de archivo es de 10MB." }
            )
        )
        .max(1, "Solo puedes subir un archivo.")
});

export const JustifyFiles = justifyUploadSchema.pick({
    files: true
});

