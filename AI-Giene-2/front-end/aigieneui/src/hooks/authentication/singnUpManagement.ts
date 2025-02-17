// useSignUp.ts (Custom hook for sign-up logic)
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setError } from '../../store/Authentication/authError';
import { toggleSignUp } from '../../store/Authentication/singUpState';
import useSignUpApi from '../../services/signUpApi';  // Import the API hook

const useSignUp = () => {
    const dispatch = useDispatch();
    const { username, password, email } = useSelector((state: RootState) => state.signUpCredentials);
    const {  handleSignUpApi } = useSignUpApi();  // Call the custom API hook inside another hook

    const handleSignUp = async () => {
        if (!username || !password || !email) {
            dispatch(setError('Fill out all signup information'));
            return;
        }

        try {
            dispatch(setError('')); // Clear previous errors
            const response = await  handleSignUpApi();  // Call the API function here

            if (response && response.status === 201) {
                dispatch(toggleSignUp());
            } 
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.error) {
                console.log('Error response data:', error.response.data);
                dispatch(setError(error.response.data.error || 'Signup failed'));
            } else {
                // Log and set a fallback error if no response
                console.error('Error signing up:', error);
            }
        }
    };

    return { handleSignUp };
};

export default useSignUp;
