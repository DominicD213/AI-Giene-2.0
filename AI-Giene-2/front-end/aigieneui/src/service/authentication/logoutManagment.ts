import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser, setSessionActive } from '../../store/Authentication/loginCredentials';
import { setUserImage, toggleUserImage } from '../../store/Authentication/userImage';

const useHandleLogout = () => {
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await axios.post('https://aigeine-api.onrender.com/logout', {}, {
                withCredentials: true,
            });

            if (response.status === 200) {
                console.log('Session logged out');
                dispatch(setSessionActive(false));
                dispatch(setUser(''));
                dispatch(setUserImage(''));
                dispatch(toggleUserImage());
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
        console.error('Error logging out:', error);
        }
    return handleLogout;
    }
};

export default useHandleLogout;