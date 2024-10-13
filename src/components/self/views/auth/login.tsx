'use client'

import Link from "next/link"

import {Input} from "@components/ui/input"
import {useAuth} from "@/context/AuthContext"
import {useForm} from "react-hook-form";
import {LoginUserType, LoginUserValidator} from "@/types/users.types";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@components/ui/form";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";
import LoadingButton from "@components/self/ui/loading-button";
import {Checkbox} from "@components/ui/checkbox";


const LoginComponent = () => {

    const {login} = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginUserType>(
        {
            resolver: zodResolver(LoginUserValidator),
            defaultValues: {
                email: "",
                password: "",
                remember: false,
            },
        }
    );

    async function onSubmit(data: LoginUserType) {
        console.log(data);
        setIsLoading(true);
        const result = await login(data);
        setIsLoading(false);

        if (result) {
            form.reset();
        }
    }

    return (
        <div className="mx-auto grid w-[450px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Iniciar sesión</h1>
                <p className="text-balance text-muted-foreground">
                    Ingrese su información para acceder a su cuenta.
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid gap-4">
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
                                                <div className="relative w-full">
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
                                            </div>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                id="remember"
                                                checked={field.value}
                                                onCheckedChange={(checked) => field.onChange(checked)}
                                            />
                                        </FormControl>
                                        <FormLabel htmlFor="remember" className="text-sm font-medium leading-none align-middle">
                                            Recordar sesión
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            isLoading={isLoading}
                            loadingText="Iniciando Sesión..."
                            className="mt-3"
                            type="submit"
                            disabled={!form.formState.isValid || isLoading}
                        >
                            Iniciar Sesión
                        </LoadingButton>
                    </div>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                ¿No tiene una cuenta?{" "}
                <Link href="/register" className="underline">
                    Regístrese
                </Link>
            </div>
        </div>
    )

}

export default LoginComponent;