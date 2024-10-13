import axios from '@/lib/axios';

export const checkSession = async () => {
    return await axios.get('/api/user');
};