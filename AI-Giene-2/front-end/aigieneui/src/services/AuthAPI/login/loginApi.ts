import axios, { AxiosResponse } from 'axios';

const useLoginAPI = () => {
    const loginApi = async (username: string, password: string): Promise<AxiosResponse> => {
        if (!username || !password) {
            throw new Error('Username and password are required.');
        }

        try {
            console.log('API URL:', process.env.REACT_APP_API_URL);
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/login`,
                { username, password },
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            return response;
        } catch (error) {
            console.error('Login API Error:', error);
            throw error;
        }
    };  

    return { loginApi };
};

export default useLoginAPI;
