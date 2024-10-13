import axios from '@/lib/axios';

export const logoutUser = async () => {
    return await axios.post('/api/logout');
};