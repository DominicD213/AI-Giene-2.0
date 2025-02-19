import { useDispatch } from "react-redux";
import { setUser, setSessionActive,setId } from '../../../store/Authentication/loginCredentials';
import { setUserImage, toggleUserImage } from '../../../store/Authentication/userImage';
import logoutAPI from '../../../services/AuthAPI/logout/logoutApi';
import { clearRequest } from "../../../store/session/sessionStatus";



const useHandleLogout = () => {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const response = await logoutAPI();
    
            if (response.status === 200) {
                console.log('Session logged out');
    
                // Dispatch actions separately
                dispatch(setSessionActive(false));
                dispatch(setUser(''));
                dispatch(setUserImage(''));
                dispatch(toggleUserImage());
                dispatch(clearRequest()); // Clear queries
                dispatch(setId('')); // Clear user ID

                window.location.reload();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }   
    };
    

    return handleLogout; // Return the function directly
};

export default useHandleLogout;
