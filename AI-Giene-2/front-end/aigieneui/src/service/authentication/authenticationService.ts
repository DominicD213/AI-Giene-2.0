import axios from 'axios';
import { setUser, setSessionActive } from '../../store/Authentication/loginCredentials';
import { setUserImage, toggleUserImage } from '../../store/Authentication/userImage';
import IconPerson from '../Assets/personPlaceHolder.png';
import { useDispatch } from 'react-redux';

const useCheckSessionStatus = () => {
  const dispatch = useDispatch();

  const checkSessionStatus = async () => {
    try {
      console.log('Fetching session status...');
      const response = await axios.get('https://aigeine-api.onrender.com/login/session-status', {
        withCredentials: true,
      });

      console.log('Session status data:', response.data);

      if (response.data && response.data.active) {
        dispatch(setSessionActive(true));
        dispatch(setUser(response.data.user.username));
        dispatch(setUserImage(response.data.user.image || IconPerson)); // Set user image if available
        dispatch(toggleUserImage());
      } else {
        dispatch(setSessionActive(false));
      }
    } catch (error) {
      console.error('Error checking session status:', error);
    }
  };

  return checkSessionStatus;
};

export default useCheckSessionStatus;
