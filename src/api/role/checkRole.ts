import axios from '@/lib/axios';

export const checkRole = async () => {
    return await axios.get('/api/role');
};