import { Home, ShoppingCart, Package, Users, ArchiveRestore } from "lucide-react";
import {ComponentType} from "react";

// Tipo para un enlace en la barra lateral
type SidebarLink = { //TODO: agregar la "r" a sidebar
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
        { href: "/asistencia", icon: Users, label: "Asistencias" },
        { href: "/justification", icon: ArchiveRestore, label: "Inasistencias" },
    ],
    profile: [
        { href: "/verify-account", icon: ShoppingCart, label: "Verificaciónes de la cuenta" },
        { href: "/cambiar-contrasena", icon: Package, label: "Cambiar Contraseña" },
    ],
    verify: [
        { href: "/verify-account", icon: ShoppingCart, label: "Verificaciónes de cuenta" },
    ],
};

export const getSiderbarLinks = (pathname: string): SidebarLink[] => {
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
