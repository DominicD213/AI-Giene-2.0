import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { updateEmail, updatePassword, updateUsername } from "../../../store/Authentication/singUpCredentails";
import { toggleSignUp } from "../../../store/Authentication/singUpState";
import  useSignUp  from "../../../hooks/authentication/handleSignUP/singnUpManagement";
import { setError } from "../../../store/Authentication/authError";
const SignUpButton = () => {
    const signUpState = useSelector((state: RootState) => state.signUpState.value);
    const loginState = useSelector((state: RootState) => state.loginState.value);
    const username = useSelector((state: RootState) => state.signUpCredentials.username);
    const password = useSelector((state: RootState) => state.signUpCredentials.password);
    const email = useSelector((state: RootState) => state.signUpCredentials.email);
    const error = useSelector((state: RootState) => state.error.value);
    const dispatch = useDispatch();


    const { handleSignUp } = useSignUp();

    const changeSignUpState = () => {
        dispatch(toggleSignUp());
        dispatch(setError('')); // Clear any existing error
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleSignUp();
    };



    return(
        <div>
          {signUpState && !loginState && (
              <>
                  <br />
                  <div className='relative mx-8 w-10/12 h-full bg-light-grey rounded-2xl mt-11'>
                      <div className='m-3'>
                          <p className='font-bold pt-1' style={{ color: 'white' }}>Sign Up</p>
                          <form id='signUpReq' onSubmit={handleSubmit}>
                              <input
                                  type='text'
                                  placeholder='Username'
                                  name='username'
                                  maxLength= {12}
                                  value={username}
                                  onChange={(e) => dispatch(updateUsername(e.target.value))}
                                  className='flex bg-light-grey outline-none px-2 text-white m-1 max-w-28'
                                  style={{ color: 'white' }}
                              />
                              <input
                                  type='password'
                                  placeholder='Password'
                                  name='password'
                                  value={password}
                                  onChange={(e) => dispatch(updatePassword(e.target.value))}
                                  className='flex bg-light-grey outline-none px-2 text-white m-1 max-w-28'
                                  style={{ color: 'white' }}
                              />
                              <input
                                  type='email'
                                  placeholder='Email'
                                  name='email'
                                  value={email}
                                  onChange={(e) => dispatch(updateEmail(e.target.value))}
                                  className='flex bg-light-grey outline-none px-2 text-white m-1 pb-2 max-w-32'
                                  style={{ color: 'white' }}
                              />
                              <button
                                  className="bg-custom-gradient rounded-lg px-4 py-2 w-20 absolute bottom-3 right-3"
                                  type='submit'
                              >
                                  Submit
                              </button>
                              {error && <p className='pr-2 pb-1 mr-2' style={{ color: 'red' }}>{error}</p>}
                          </form>
                          <button
                                onClick={changeSignUpState}
                                className='outline-none mb-2 ml-2'
                                style={{color:'red'}}
                                >
                                Cancel
                              </button>
                      </div>
                  </div>
              </>
          )}
      </div>
    )
}

export default SignUpButton;