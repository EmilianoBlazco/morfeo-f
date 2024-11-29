import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/hooks/useNotifications"; // Hook personalizado
import { useState } from "react";

// Función para renderizar los datos de la notificación
const renderNotificationData = (data: unknown): string => {
    if (typeof data === "string") return data;
    if (typeof data === "object" && data !== null) {
        // Verificamos que data tenga una propiedad 'message'
        const notificationData = data as { message: string };
        return notificationData.message || "Notificación recibida";
    }
    return "Detalles no disponibles";
};

export default function NotificationsMenu() {
    const { countNotifications, notifications, loading, markNotificationsAsReadAll, markNotificationAsReadSingle } = useNotifications();
    const [isOpen, setIsOpen] = useState(false);

    const handleNotificationClick = async (notificationId: string) => {
        await markNotificationAsReadSingle(notificationId);
        setIsOpen(false);
    };

    const handleClearAll = async () => {
        await markNotificationsAsReadAll();
        setIsOpen(false);
    };

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <AnimatePresence>
                        {countNotifications > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-400 text-white text-xs flex items-center justify-center"
                            >
                                {countNotifications}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-80 bg-white/70 backdrop-blur-lg border border-gray-300 shadow-2xl rounded-lg overflow-hidden"
            >
                <div className="p-4 border-b border-gray-200/30 bg-white/50">
                    <h3 className="text-lg font-semibold text-gray-900">Notificaciones</h3>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Cargando...</div>
                    ) : notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No hay notificaciones nuevas</div>
                    ) : (
                        notifications.map((notification) => (
                            <DropdownMenuItem
                                key={notification.id}
                                className="flex flex-col items-start p-4 border-b border-gray-100/50 hover:bg-white/30 transition-colors duration-200 cursor-pointer"
                                onClick={() => handleNotificationClick(notification.id.toString())}
                            >
                                <p className="font-medium text-sm text-gray-900 mb-1">
                                    {/* Aquí mostramos el 'message' extraído de 'data' */}
                                    {renderNotificationData(JSON.parse(notification.data).message)}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(notification.created_at).toLocaleString()}
                                </p>
                            </DropdownMenuItem>
                        ))
                    )}
                </div>
                {notifications.length > 0 && (
                    <div className="p-2 border-t border-gray-200/30 bg-white/50">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full text-gray-700 hover:text-gray-900 hover:bg-white/50"
                            onClick={handleClearAll}
                        >
                            Limpiar todas
                        </Button>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}