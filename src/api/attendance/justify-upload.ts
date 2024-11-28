import axios from "@/lib/axios";

export const justif_upload = async (formData: FormData) => {
    return await axios.post('/api/justify-upload', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};