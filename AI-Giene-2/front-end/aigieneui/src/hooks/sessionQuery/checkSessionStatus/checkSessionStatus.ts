import { setSessionActive } from '../../../store/Authentication/loginCredentials';
import useSessionStatusApi from '../../../services/queryServices/sessionStatusService/sessionStatusApi';
import { useDispatch } from 'react-redux';
const useCheckSessionStatus = () => {
    const dispatch = useDispatch();
    const { sessionStatusApi } = useSessionStatusApi();

    const checkSessionStatus = async () => {
        try {
            const response = await sessionStatusApi();
            dispatch(setSessionActive(response.data.active));
            
        } catch (error) {
            console.error('Session Check Error:', error);
            dispatch(setSessionActive(false))
        }
    };

    checkSessionStatus(); // Initial check;
    return { checkSessionStatus };
}

export default useCheckSessionStatus;