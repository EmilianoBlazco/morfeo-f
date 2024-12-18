import {Home, QrCode, ScanLine, CalendarPlus, ArchiveRestore, UserRoundSearch, NotepadText, CalendarSearch} from "lucide-react";
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
    { href: "/qr-code", icon: QrCode, label: "Qr de Asistencia" },
    { href: "/qr-scan", icon: ScanLine , label: "Escaneo de Qr" },
    { href: "/attendances", icon: ArchiveRestore, label: "Asistencias" },
    { href: "/approve-justifications", icon: UserRoundSearch, label: "Control de Justificaciones" },
    { href: "/license", icon: CalendarPlus, label: "Licencias" },
    { href: "/license/verify-license", icon: CalendarSearch , label: "Verificacion de Licencias" },
    { href: "/payroll-data", icon: NotepadText, label: "Datos para Liquidación" },
];

// Configuración de rutas adicionales
const routesConfig: Record<string, SidebarLink[]> = {
    admin: [
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
