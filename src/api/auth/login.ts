import axios from '@/lib/axios';
import {LoginUserType} from "@/types";

export const loginUser = async (user:LoginUserType) => {
    return await axios.post('/api/login', {...user});    
};
