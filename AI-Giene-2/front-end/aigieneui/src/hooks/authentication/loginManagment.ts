import { useDispatch } from "react-redux";
import { setLoading } from "../../store/Authentication/loginButton";
import { setUserImage } from "../../store/Authentication/userImage";
import { toggleLogin } from "../../store/Authentication/loginState";
import { setError } from "../../store/Authentication/authError";
import { AxiosError } from "axios";
import useLoginAPI from "../../services/loginApi";
import useCheckSessionStatus from "./authenticationService";

const useLogin = () => {
    const dispatch = useDispatch();
    const { loginApi } = useLoginAPI();
    const checkSessionStatus = useCheckSessionStatus();

    const handleLogin = async (username: string, password: string): Promise<void> => {
        if (!username || !password) {
            dispatch(setError('Please enter both username and password.'));
            return;
        }

        dispatch(setError(''));
        dispatch(setLoading());

        try {
            const response = await loginApi(username, password);

            console.log('Login response:', response.data);
            if (response.status === 200) {
                const { user } = response.data;
                checkSessionStatus();
                dispatch(setUserImage(user.image));
                dispatch(toggleLogin());
            } else {
                dispatch(setError(`Login failed: ${response.data.message || 'Unknown error'}`));
            }
        } catch (error) {
            const err = error as AxiosError;
            if (err.response) {
                const errorMessage = (err.response.data as { message: string }).message || 'Login failed';
                dispatch(setError(errorMessage));
            } else if (err.request) {
                dispatch(setError('No response from the server. Please try again later.'));
            } else {
                dispatch(setError('Login failed due to an unexpected error.'));
            }
        } finally {
            dispatch(setLoading());
        }
    };

    return { handleLogin };
};

export default useLogin;
