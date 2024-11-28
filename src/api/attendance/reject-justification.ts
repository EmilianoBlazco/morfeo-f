import axios from "@/lib/axios";

export const reject_justification = async (justificationId: number) => {
    const response = await axios.patch(`/api/attendance/justify-uploads/reject/${justificationId}`);
    return response.data; // Devuelve el mensaje o los datos necesarios
};
