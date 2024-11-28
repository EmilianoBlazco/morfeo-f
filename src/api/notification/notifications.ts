import axios from "@/lib/axios";

export const userNotifications = async (user: bigint) => {
    return await axios.get('/api/notifications', {
        params: { user_id: user }
    });
}