import { Home, ShoppingCart, Package, Users } from "lucide-react";
import {ComponentType} from "react";

// Tipo para un enlace en la barra lateral
type SidebarLink = {
    href: string;
    icon: ComponentType;
    label: string;
};

// Enlaces base
const baseLinks: SidebarLink[] = [
    { href: "/dashboard", icon: Home, label: "Inicio" },
];

// Configuración de rutas adicionales
const routesConfig: Record<string, SidebarLink[]> = {
    dashboard: [
        { href: "/turnos", icon: ShoppingCart, label: "Turnos" },
        { href: "/profile", icon: Users, label: "Perfil" },
    ],
    profile: [
        { href: "/verify-account", icon: ShoppingCart, label: "Verificaciónes de la cuenta" },
        { href: "/cambiar-contrasena", icon: Package, label: "Cambiar Contraseña" },
    ],
    verify: [
        { href: "/verify-account", icon: ShoppingCart, label: "Verificaciónes de cuenta" },
    ],
};

export const getSidebarLinks = (pathname: string): SidebarLink[] => {
    // Filtra las rutas específicas según el pathname
    const additionalLinks = Object.entries(routesConfig).reduce<SidebarLink[]>((acc, [key, links]) => {
        if (pathname.startsWith(`/${key}`)) {
            return [...acc, ...links];
        }
        return acc;
    }, []);

    // Combina los enlaces base con los adicionales
    return [...baseLinks, ...additionalLinks];
};