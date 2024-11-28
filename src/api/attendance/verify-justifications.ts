import {UserIDType} from "@/types";
import axios from "@/lib/axios";

export const verify_justifications = async (user: UserIDType) => {
    const response = await axios.get('/api/verify-justifications', {
        params: { user_id: user.id }
    });
    return response.data;
}