import axios, { AxiosResponse } from 'axios';
import resetSocketConnection from './socketAPI';

const logoutAPI = async (): Promise<AxiosResponse> => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, {
        withCredentials: true,
    });
    if (response.status === 200) {
        console.log('Session logged out');
    } else {
        console.error('Logout failed');
        resetSocketConnection()
    }
    return response;
}

export default logoutAPI;
