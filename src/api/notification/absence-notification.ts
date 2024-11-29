import axios from "@/lib/axios";

export const absenceNotification = async () => {
    return await axios.post('/api/notifications/notify-absence');
};