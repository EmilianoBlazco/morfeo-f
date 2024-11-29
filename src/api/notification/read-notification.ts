import axios from "@/lib/axios";

// Marca una notificación individual como leída
export const markSingleNotificationAsRead = async (notificationId: string) => {
    try {
        const response = await axios.patch(`/api/notifications/mark-read/${notificationId}`);
        return response.data; // Devuelve los datos del backend si es necesario
    } catch (error) {
        console.error("Error al marcar la notificación como leída:", error);
    }
};

// Marca todas las notificaciones como leídas
export const markAllNotificationsAsRead = async () => {
    try {
        const response = await axios.patch("/api/notifications/mark-read-all");
        return response.data; // Devuelve los datos del backend si es necesario
    } catch (error) {
        console.error("Error al marcar todas las notificaciones como leídas:", error);
        throw error;
    }
};