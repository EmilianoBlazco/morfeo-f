'use client'

import Link from "next/link"
import Image from "next/image"

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useAuth} from "@/context/AuthContext"
import {useForm} from "react-hook-form";
import {RegisterUserType, RegisterUserValidator} from "@/types/users.types";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useState} from "react";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {usePasswordValidator} from "@/hooks/usePasswordValidation";


const RegisterComponent = () => {

    const {register} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<RegisterUserType>(
        {
            resolver: zodResolver(RegisterUserValidator),
            defaultValues: {
                name: "",
                surname: "",
                dni: "",
                phone: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
        }
    );

    const password = form.watch("password", "");
    const passwordCriteria = usePasswordValidator(password);

    async function onSubmit(data: RegisterUserType) {
        console.log(data);
        setIsLoading(true);
        const result = await register(data);
        setIsLoading(false);

        if (result) {
            form.reset();
        }
    }

    return (

        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/Portada.png"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[450px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Registro</h1>
                        <p className="text-balance text-muted-foreground">
                            Ingrese su información para crear una cuenta.
                        </p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor={"name"}>Nombre</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id={"name"}
                                                            type={"text"}
                                                            placeholder="Nombre" {...field}
                                                            required={true}
                                                            aria-required={true}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="surname"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor={"lastname"}>Apellido</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id={"lastname"}
                                                            type={"text"}
                                                            placeholder="Apellido" {...field}
                                                            required={true}
                                                            aria-required={true}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="dni"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor={"dni"}>DNI</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id={"dni"}
                                                            type={"number"}
                                                            placeholder="DNI" {...field}
                                                            required={true}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form.control}
                                            name="phone"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel htmlFor={"phone"}>Telefono</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            id={"phone"}
                                                            type={"tel"}
                                                            placeholder="Telefono" {...field}
                                                            required={true}
                                                            aria-required="true"
                                                            aria-describedby="phone-help"
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={"email"}>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id={"email"}
                                                        type={"email"}
                                                        placeholder="Email" {...field}
                                                        required={true}
                                                        aria-required="true"
                                                        aria-describedby="email-help"
                                                    />
                                                </FormControl>
                                                <FormDescription id="email-help">
                                                    Ejemplo: tucorreo@ejemplo.com
                                                </FormDescription>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={"password"}>Contraseña</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            id={"password"}
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="Contraseña"
                                                            {...field}
                                                            required={true}
                                                            aria-required="true"
                                                            aria-describedby="password-criteria"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                                        >
                                                            {showPassword ? <Eye aria-hidden="true"/> :
                                                                <EyeOff aria-hidden="true"/>}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <Accordion type="single" collapsible className="w-full">
                                                    <AccordionItem value="item-1">
                                                        <AccordionTrigger>Requisitos de
                                                            contraseña</AccordionTrigger>
                                                        <AccordionContent id="password-criteria">
                                                            <ul className="list-disc list-inside">
                                                                <li className={passwordCriteria.length ? "text-green-600" : "text-red-600"}>
                                                                    Al menos 8 caracteres
                                                                </li>
                                                                <li className={passwordCriteria.specialChar ? "text-green-600" : "text-red-600"}>
                                                                    Al menos un carácter especial (@$!%*#?&)
                                                                </li>
                                                                <li className={passwordCriteria.upperLowerCase ? "text-green-600" : "text-red-600"}>
                                                                    Al menos una letra mayúscula y una minúscula
                                                                </li>
                                                                <li className={passwordCriteria.number ? "text-green-600" : "text-red-600"}>
                                                                    Al menos un número
                                                                </li>
                                                            </ul>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <FormField
                                        control={form.control}
                                        name="password_confirmation"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={"password_confirmation"}>Confirmar
                                                    contraseña</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            id={"password_confirmation"}
                                                            type={showConfirmPassword ? "text" : "password"}
                                                            placeholder="Confirmar contraseña" {...field}
                                                            required={true}
                                                            aria-required="true"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                                            aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                                                        >
                                                            {showConfirmPassword ? <Eye aria-hidden="true"/> :
                                                                <EyeOff aria-hidden="true"/>}
                                                        </button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} className="w-full"
                                        aria-busy={isLoading}>
                                    {isLoading ?
                                        <div className="flex items-center space-x-2">
                                            <Loader2 className="w-6 h-6 animate-spin" aria-hidden="true"/>
                                            <span>Registrando...</span>
                                        </div>
                                        : "Registrarse"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-4 text-center text-sm">
                        ¿Ya tiene una cuenta?{" "}
                        <Link href="/login" className="underline">
                            Iniciar Sesión
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;