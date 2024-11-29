import axios from "@/lib/axios";

export const accept_justification = async (justificationId: number) => {
    try {
        const response = await axios.patch(`/api/attendance/justify-uploads/accept/${justificationId}`);
        return response.data; // Devuelve los datos del backend si es necesario
    } catch (error) {
        console.error("Error al aceptar el justificativo:", error);
        throw error; // Lanza el error para que pueda manejarse donde se llame esta función
    }
};
