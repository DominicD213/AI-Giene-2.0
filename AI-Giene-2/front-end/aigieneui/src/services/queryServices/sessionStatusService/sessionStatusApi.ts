import axios, { AxiosResponse } from "axios";

const linkSessionStatusApi = () => {
    const sessionStatusApi = async (): Promise<AxiosResponse> => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/session-status`, {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            console.error('Error fetching session status:', error);
            throw error; // Rethrow or handle as needed
        }
    };
    return { sessionStatusApi };
}

export default linkSessionStatusApi;

