import {z} from 'zod';

export const UserValidator = z.object({

    id: z.bigint()
        .positive(),

    name: z.string()
        .min(1, {message: "El nombre debe tener al menos una letra"})
        .max(255, {message: "El nombre no puede tener más de 255 letras"})
        .toLowerCase(),

    surname: z.string()
        .min(1, {message: "El apellido debe tener al menos una letra"})
        .max(255, {message: "El apellido no puede tener más de 255 letras"})
        .toLowerCase(),

    email: z.string()
        .trim()
        .email({message: "El correo electrónico no es válido"})
        .max(255, {message: "El correo electrónico no puede tener más de 255 caracteres"}),

    email_verified_at: z.string()
        .datetime({message: "Formato de fecha inválido"}),

    dni: z.string()
        .trim()
        .min(7, {message: "El DNI debe tener al menos 7 números"})
        .max(9, {message: "El DNI no puede tener más de 9 números"})
        .regex(/^\d+$/, {message: "El DNI debe contener solo números"}),

    phone: z.string()
        .trim()
        .min(10, {message: "El celular debe tener al menos 10 números"})
        .max(15, {message: "El celular no puede tener más de 15 números"})
        .regex(/^\d+$/, {message: "El celular debe contener solo números"})
        .or(z.literal('')),

    password: z.string()
        .min(8, {message: "La contraseña debe tener al menos 8 caracteres"})
        .max(70, {message: "La contraseña no puede tener más de 70 caracteres"})
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/, {
            message: "La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial"
        }),

    password_confirmation: z.string(),

    remember: z.boolean(),

    role: z.array(z.string()),
});

export const RegisterUserValidator = UserValidator.omit({
    id: true,
    email_verified_at: true,
    remember: true,
    role:true
}).refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: "Las contraseñas no coinciden",
});

export const LoginUserValidator = UserValidator.pick({
    email: true,
    password: true,
    remember: true
}).extend({
    password: z.string()
        .min(1, {message: "Debes proporcionar una contraseña"}),
})

export const UserID = UserValidator.pick({
    id: true
});

export type UserType = z.infer<typeof UserValidator>;
export type RegisterUserType = z.infer<typeof RegisterUserValidator>;
export type LoginUserType = z.infer<typeof LoginUserValidator>;
export type UserIDType = z.infer<typeof UserID>;