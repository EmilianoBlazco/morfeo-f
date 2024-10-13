import axios from "@/lib/axios";

export const csrfToken = async () => {
    return await axios.get('/sanctum/csrf-cookie');
}