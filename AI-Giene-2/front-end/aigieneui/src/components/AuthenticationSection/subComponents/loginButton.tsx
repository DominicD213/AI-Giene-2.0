import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import { toggleLogin } from "../../../store/Authentication/loginState";
import useLogin from "../../../hooks/authentication/loginManagment";
import { setUser, setLoginPassword } from "../../../store/Authentication/loginCredentials";
import { setError } from "../../../store/Authentication/authError";

const LoginButton = () => {
    const dispatch = useDispatch();
    const signUpState = useSelector((state: RootState) => state.signUpState.value);
    const loginState = useSelector((state: RootState) => state.loginState.value);
    const loginUsername = useSelector((state: RootState) => state.login.user);
    const loginPassword = useSelector((state: RootState) => state.login.loginPassword);
    const error = useSelector((state: RootState) => state.error.value);
    const loading = useSelector((state: RootState) => state.loginButton.loading);
    const { handleLogin } = useLogin();

    const changeLoginState = () => {
        dispatch(toggleLogin());
        dispatch(setError('')); // Clear any existing error
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default browser behavior
        try {
            await handleLogin(loginUsername, loginPassword); // Pass username and password
        } catch (err: any) {
            console.error('Error during login:', err);
            dispatch(setError(err.message || "Something went wrong!")); // Handle login error
        }
    };

    return (
        <div>
            {!signUpState && loginState && (
                <>
                    <br />
                    <div className='relative ml-8 w-10/12 h-full bg-light-grey rounded-2xl'>
                        <div className='m-3 w-3/5'>
                            <p className='font-bold pt-1' style={{ color: 'white' }}>Login</p>
                            <form onSubmit={handleSubmit}>
                                <input
                                    className='flex max-w-36 h-full bg-light-grey outline-none px-2 text-white m-1'
                                    type='text'
                                    placeholder='Username'
                                    name='username'
                                    value={loginUsername || ''}
                                    onChange={(e) => dispatch(setUser(e.target.value))}
                                    style={{ color: 'white' }}
                                    disabled={loading}
                                />
                                <input
                                    className='flex max-w-36 h-full bg-light-grey outline-none px-2 text-white m-1 pb-2'
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={loginPassword}
                                    onChange={(e) => dispatch(setLoginPassword(e.target.value))}
                                    style={{ color: 'white' }}
                                    disabled={loading}
                                />
                                <button
                                    className={`bg-custom-gradient rounded-lg px-4 py-2 w-20 absolute bottom-3 right-3 ${loading ? 'opacity-50' : ''}`}
                                    type='submit'
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Submit'}
                                </button>
                                <button
                                    onClick={changeLoginState}
                                    className='outline-none mb-2 ml-2'
                                    style={{ color: 'red' }}
                                >
                                    Cancel
                                </button>
                                {error && (
                                    <div className=" mt-2 w-2/3" style={{ color: 'red' }} role="alert">
                                        {error}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginButton;
