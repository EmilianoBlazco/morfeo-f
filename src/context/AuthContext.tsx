'use client'

import {LoginUserType, RegisterUserType, UserType} from "@/types/users.types";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {csrfToken} from "@/api/general/csrfToken";
import {registerUser} from "@/api/auth/register";
import {loginUser} from "@/api/auth/login";
import {logoutUser} from "@/api/auth/logout";
import Cookies from "js-cookie";
import {checkSession} from "@/api/general/checkSession";
import {checkRole} from "@/api/role/checkRole";
import {useHandleError} from "@/hooks/useHandleError";

interface AuthContextType {
    user: UserType | null;
    register: (user: RegisterUserType) => Promise<boolean>;
    login: (user: LoginUserType) => Promise<boolean>;
    logout: () => Promise<boolean>;
}

// Creamos el contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter();
    const handleError = useHandleError();

    // Efecto para verificar si hay una sesión activa al cargar la aplicación
    useEffect(() => {
        const initializeSession = async () => {
            try {
                const {data} = await checkSession();
                setUser(data);
                Cookies.set('authToken', 'true', { sameSite: 'lax' });
            } catch (error) {
                console.log(error);
                setUser(null);
                Cookies.remove('authToken');
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
            handleError('register',error);
            return false;
        }
    };


    const login = async (user: LoginUserType) => {
        try {
            await csrfToken();
            await loginUser(user);
            const {data} = await checkSession();
            const roleResponse = await checkRole();
            console.log("role", roleResponse.data)
            setUser({...data, role: roleResponse.data});
            Cookies.set('authToken', 'true', { sameSite: 'lax' });
            router.push('/dashboard');
            return true;
        } catch (error) {
            handleError('login',error);
            return false;
        }
    }

    const logout = async () => {
        try {
            await logoutUser();
            setUser(null);
            Cookies.remove('authToken');
            router.push('/');
            return true;
        } catch (error) {
            handleError('logout',error);
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{user, register, login, logout}}>
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