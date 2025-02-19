import axios, { AxiosResponse } from "axios";
import { useSelector, useDispatch} from "react-redux";
import { RootState } from "../../../store/store";
import { setError } from "../../../store/Authentication/authError";

// Custom hook to interact with the signup API
const useSignUpApi = () => {
    const dispatch = useDispatch();

    const { username, password, email } = useSelector((state: RootState) => state.signUpCredentials);


    // Function to handle sign-up API call
    const handleSignUpApi = async (): Promise<AxiosResponse | void> => {
        if (!username || !password || !email) {
            setError("Please provide all the required fields.");
            return;
        }
        console.log({ username, password, email });

        try {
            // Send POST request to the signup endpoint
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/signup`, {
                username,
                password,
                email,
            });
            return response;
        } catch (error: any) {
            // Check if there's a response from the backend and display it
            const errorMessage = error.response?.data?.message || error.message;
            const field = error.response?.data?.field; // Get the conflicting field (username/email)
            
            console.error(errorMessage);  // Log the error
            
            // Set error message in state so we can display it in the UI
            dispatch(setError(`${field ? `${field} ` : ''}${errorMessage}`));
            console.log(`this is the error log${errorMessage}`);

            throw new Error(errorMessage); // Rethrow the error to be handled elsewhere
        }
    };

    return { handleSignUpApi};
};

export default useSignUpApi;
