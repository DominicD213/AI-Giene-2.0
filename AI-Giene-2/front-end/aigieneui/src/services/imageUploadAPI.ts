import axios from "axios";

const imageUploadAPI = async (formData: FormData) => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/login/session-status/upload`,
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data" // Important for file uploads
                }
            }
        );
        return response;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export default imageUploadAPI;
