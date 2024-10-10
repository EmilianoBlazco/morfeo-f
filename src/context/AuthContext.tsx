'use client'

import {RegisterUserType, UserType} from "@/types/users.types";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {csrfToken} from "@/api/csrfToken";
import {registerUser} from "@/api/registerUser";
import {checkSession} from "@/api/checkSession";

interface AuthContextType {
    user: UserType | null;
    register: (user: RegisterUserType) => Promise<boolean>;
    //TODO: Crear funcion de login
}

// Creamos el contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();

    // Efecto para verificar si hay una sesión activa al cargar la aplicación
    useEffect(() => {
        const initializeSession = async () => {
            try {
                const {data} = await checkSession();
                setUser(data);
            } catch (error) {
                console.log(error);
                setUser(null);
            }
        };

        void initializeSession();
    }, []);

    const register = async (user: RegisterUserType) => {
        try{
            await csrfToken();
            await registerUser(user);
            const {data} = await checkSession();
            setUser(data);
            router.push('/dashboard');
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    //TODO: Implementar función de login
    //TODO: Minimante usar csrfToken, checkSession, setUser y router.push('/dashboard')
    //TODO: Crear llamada a la API
    //TODO: Crear vista y componente

    return (
        <AuthContext.Provider value={{user, register}}>
            {children}
        </AuthContext.Provider>
    );

};

// Hook para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider'); // Error si el hook se usa fuera del proveedor
    }
    return context;
};