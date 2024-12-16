import {UserIDType} from "@/types";
import axios from "@/lib/axios";

export const userAttendances = async (user?: UserIDType) => {
    return await axios.get('/api/attendances', {
        params: user ? { user_id: user.id } : {}
    });
}