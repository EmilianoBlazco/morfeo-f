import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { userNotifications } from "@/api/notification/notifications";
import {markAllNotificationsAsRead, markSingleNotificationAsRead} from "@/api/notification/read-notification";

type Notification = {
    id: string;
    notifiable_id: number;
    data: string; // Este campo contiene una cadena JSON que debe ser parseada
    created_at: string;
    read_at: string | null;
    message?: string; // Propiedad opcional que se añadirá con el mensaje
};

export const useNotifications = () => {
    const { user } = useAuth();
    const userId = user?.id || BigInt(0);
    const [countNotifications, setCountNotifications] = useState<number>(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            setLoading(true);
            try {
                const { data } = await userNotifications(userId);

                // Parseamos las notificaciones para extraer solo el 'message'
                const notificationsWithMessage = data.notifications.map((notification: Notification) => {
                    // Parseamos el campo 'data' que es un JSON
                    const parsedData = JSON.parse(notification.data);

                    // Extraemos solo el mensaje del objeto 'parsedData'
                    const message = parsedData.message || ""; // Si no hay mensaje, asignamos una cadena vacía

                    return {
                        ...notification,
                        message, // Asignamos el mensaje extraído
                    };
                });

                setCountNotifications(data.count || 0);
                setNotifications(notificationsWithMessage);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) fetchNotifications();
    }, [userId]);

    // Función para marcar una notificación como leída
    const markNotificationAsReadSingle = async (notificationId: string) => {
        try {
            const data = await markSingleNotificationAsRead(notificationId);

            if (data.status === "success") {

                // Parseamos las notificaciones para extraer solo el 'message'
                const notificationsWithMessage = data.notifications.map((notification: Notification) => {
                    // Parseamos el campo 'data' que es un JSON
                    const parsedData = JSON.parse(notification.data);

                    // Extraemos solo el mensaje del objeto 'parsedData'
                    const message = parsedData.message || ""; // Si no hay mensaje, asignamos una cadena vacía

                    return {
                        ...notification,
                        message, // Asignamos el mensaje extraído
                    };
                });

                setCountNotifications(data.count || 0);
                setNotifications(notificationsWithMessage);
            }
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Función para marcar todas las notificaciones como leídas
    const markNotificationsAsReadAll = async () => {
        try {
            await markAllNotificationsAsRead();
            setCountNotifications(0);
            setNotifications([]);
        } catch (error) {
            console.error("Error marking notifications as read:", error);
        }
    };

    return { countNotifications, notifications, markNotificationsAsReadAll, markNotificationAsReadSingle, loading };
};