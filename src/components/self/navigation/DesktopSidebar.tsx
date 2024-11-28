import Link from "next/link";
import { BellRing, Menu, X, Loader } from "lucide-react"; // Importa el ícono Loader
import { Button } from "@components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getSiderbarLinks } from "@/lib/getSiderbarLinks";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { absenceNotification } from "@/api/notification/absence-notification";

type SidebarLink = {
    href: string;
    icon: React.ComponentType;
    label: string;
};

const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        const updateMatch = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        // Set the initial value
        setMatches(media.matches);

        // Use the modern event listener methods
        media.addEventListener("change", updateMatch);

        // Clean up
        return () => media.removeEventListener("change", updateMatch);
    }, [query]);

    return matches;
};

const Sidebar = () => {
    const pathname = usePathname();
    const links = useMemo(() => getSiderbarLinks(pathname), [pathname]);

    const [isOpen, setIsOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Estado de carga
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useEffect(() => {
        setIsOpen(isDesktop);
    }, [isDesktop]);

    const handleNotifyClick = async () => {
        setIsLoading(true); // Activar estado de carga

        try {
            await absenceNotification();
            toast({
                title: "Notificación enviada",
                description: "Se ha notificado al supervisor correctamente.",
                variant: "succsess",
            });
        } catch (error) {
            console.error("Error al enviar la notificación:", error);
            toast({
                title: "Error",
                description: "No se pudo enviar la notificación al supervisor.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false); // Desactivar estado de carga
        }
    };

    const sidebarContent = (
        <motion.div
            initial={{x: "-100%"}}
            animate={{x: 0}}
            exit={{x: "-100%"}}
            transition={{type: "spring", stiffness: 300, damping: 30}}
            className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r md:relative md:translate-x-0"
        >
            <div className="flex h-16 items-center border-b px-4 md:px-6 lg:px-8">
                <Link href="/public" className="flex items-center gap-2 font-semibold">
                    <Image
                        src="/images/Icon.ico"
                        alt="Logo"
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain dark:brightness-[0.2] dark:grayscale"
                    />
                    <motion.span
                        initial={{opacity: 0, y: -20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                    >
                        Morfeo S.A.
                    </motion.span>
                </Link>
                {!isDesktop && (
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto h-8 w-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <nav className="flex flex-col min-h-full">
                {links.map((link: SidebarLink, index: number) => (
                    <motion.div
                        key={link.href}
                        initial={{opacity: 0, x: -20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: index * 0.1}}
                    >
                        <Link
                            href={link.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                                pathname === link.href ? "bg-muted text-primary" : ""
                            }`}
                            onMouseEnter={() => setHoveredLink(link.href)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            {link.icon && <link.icon/>}
                            {link.label}
                            {hoveredLink === link.href && (
                                <motion.div
                                    layoutId="hoverIndicator"
                                    className="absolute left-0 w-1 h-full bg-primary"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                />
                            )}
                        </Link>
                    </motion.div>
                ))}

                <div className="px-4 py-2 mt-auto">
                    <Button
                        variant="destructive"
                        onClick={handleNotifyClick}
                        className="w-full text-white bg-red-600 hover:bg-red-700 border-red-700 border-2 flex items-center justify-center space-x-2"
                        disabled={isLoading} // Deshabilitar el botón cuando está cargando
                    >
                        {/* Animar la campana o el Loader */}
                        {isLoading ? (
                            <motion.div
                                className="h-4 w-4"
                                animate={{rotate: 360}}
                                transition={{repeat: Infinity, duration: 1}}
                            >
                                <Loader className="h-4 w-4 animate-spin"/>
                            </motion.div>
                        ) : (
                            <motion.div
                                className="h-4 w-4"
                                whileHover={{
                                    x: [0, 4, -4, 4, -4, 0], // Vibración en el eje X
                                    transition: {
                                        duration: 0.5,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }}
                            >
                                <BellRing className="h-4 w-4"/>
                            </motion.div>
                        )}
                        <span>{isLoading ? "Enviando notificación" : "Notificar Ausencia"}</span>
                    </Button>
                </div>
            </nav>
        </motion.div>
    );

    return (
        <>
            {!isDesktop && (
                <div className="flex h-16 items-center border-b px-4 md:px-6 lg:px-8">
                    <Button
                        variant="outline"
                        size="icon"
                        className="ml-auto h-8 w-8"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={isOpen ? "close" : "open"}
                                initial={{opacity: 0, rotate: -180}}
                                animate={{opacity: 1, rotate: 0}}
                                exit={{opacity: 0, rotate: 180}}
                                transition={{duration: 0.3}}
                            >
                                {isOpen ? <X className="h-4 w-4"/> : <Menu className="h-4 w-4"/>}
                            </motion.div>
                        </AnimatePresence>
                    </Button>
                </div>
            )}

            <AnimatePresence>{(isOpen || isDesktop) && sidebarContent}</AnimatePresence>

            {isOpen && !isDesktop && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                    className="fixed inset-0 z-30 bg-black/50"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
