import Link from "next/link";
import { Menu, X } from "lucide-react"; // Importa el ícono de cerrar
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { getSiderbarLinks } from "@/lib/getSiderbarLinks";
import Image from "next/image";

const Sidebar = () => {
    const pathname = usePathname();
    const links = useMemo(() => getSiderbarLinks(pathname), [pathname]);

    const [isOpen, setIsOpen] = useState(false); // Estado para controlar visibilidad en móviles

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Alternar estado de la sidebar
    };

    return (
        <>
            {/* Botón de menú para dispositivos móviles */}
            <div className="flex md:hidden h-16 items-center border-b px-4 md:px-6 lg:px-8">
                <Button variant="outline" size="icon" className="ml-auto h-8 w-8" onClick={toggleSidebar}>
                    {isOpen ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
                </Button>
            </div>

            {/* Sidebar para dispositivos de escritorio */}
            <div
                className={`fixed inset-0 z-40 md:z-auto md:static md:flex flex-col w-64 bg-white border-r transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <div className="flex h-16 items-center border-b px-4 md:px-6 lg:px-8">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Image
                            src="/images/Icon.ico"
                            alt="Image"
                            width={24}
                            height={24}
                            className="h-6 w-6 object-contain dark:brightness-[0.2] dark:grayscale"
                        />
                        <span className="">Morfeo S.A.</span>
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8 md:hidden" onClick={toggleSidebar}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex-1 overflow-y-auto mt-4">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        {links.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                    pathname === link.href ? "bg-muted text-primary" : ""
                                }`}
                            >
                                <link.icon />
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Fondo oscuro cuando la sidebar está abierta en móviles */}
            {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={toggleSidebar}></div>}
        </>
    );
}

export default Sidebar;
