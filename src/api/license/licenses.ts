import axios from "@/lib/axios";


export const get_licenses = async () => {
    const response = await axios.get('/api/licenses');
    return response.data;
}

export const create_license = async (formData: FormData) => {
    return await axios.post('/api/license-requests', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

export const get_supervisor_request = async () => {
    const response = await axios.get('/api/license-requests/verify');
    return response.data;
}

