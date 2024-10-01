import {RegisterUserType} from "@/types";
import axios from "@/lib/axios";

export const registerUser = async (user: RegisterUserType) => {
    return await axios.post('/api/register', {...user});
}