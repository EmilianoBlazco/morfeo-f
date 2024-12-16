import axios from '@/lib/axios';
import {AttendanceType} from "@/types";

export const attendanceUser = async (attendance:AttendanceType) => {
    console.log(attendance);
    return await axios.post('/api/attendance', attendance);
};
