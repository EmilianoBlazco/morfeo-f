import {Home, ArchiveRestore, UserRoundSearch} from "lucide-react";
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
        { href: "/attendances", icon: ArchiveRestore, label: "Asistencias" },
        { href: "/approve-justifications", icon: UserRoundSearch, label: "Control de Justificaciones" },
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
