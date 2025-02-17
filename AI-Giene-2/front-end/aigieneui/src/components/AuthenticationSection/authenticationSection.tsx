import React from "react";
import { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleLogin } from "../../store/Authentication/loginState";
import { toggleSignUp } from "../../store/Authentication/singUpState";
import useHandleImageChanges from "../../hooks/authentication/handleImageChange";
import  useHandleLogout  from "../../hooks/authentication/logoutManagment";
import SignUpButton from "./subComponents/signUpButton";
import LoginButton from "./subComponents/loginButton";

const AuthenticationSection: React.FC = () =>{
    const dispatch = useDispatch();
    const signUpState = useSelector((state: RootState) => state.signUpState.value);
    const loginState = useSelector((state: RootState) => state.loginState.value);
    const sessionActive = useSelector((state: RootState) => state.login.sessionActive);
    const userImage = useSelector((state: RootState) => state.userImage.userImage);
    const loginUsername = useSelector((state: RootState) => state.login.user);

    const handleLogout = useHandleLogout();
    const handleImageChange = useHandleImageChanges();
    const imageInputRef = React.useRef<HTMLInputElement>(null);

    return(
        <div className='my-2'>
          <div className='max-lg:hidden'>
            <p className="text-center text-light-grey border-t border-light-grey mx-4"></p><br />
          </div>
        {!signUpState && !loginState && !sessionActive && (
          <>
            <div className="w-max m-auto rounded-2xl h-10 flex">
              <button className="bg-custom-gradient rounded-lg px-4 w-20 max-lg:py-2 max-sm:w-[20vw]" onClick={() => dispatch(toggleLogin())}>Login</button>
              <button className="bg-custom-gradient rounded-lg ml-2 px-4 w-20 max-lg:py-2 max-sm:w-[20vw]" onClick={() => dispatch(toggleSignUp())}>SignUp</button>
            </div>
          </>
        )}

        {signUpState && (
            <SignUpButton/>
        )}

        {loginState && (
            <LoginButton/>
        )}
        
        {sessionActive && (
          <>
            <div className='rounded-2xl h-10 mx-5 flex items-center max-h-10'>
              <div className='bg-light-grey rounded-2xl'>
                <img
                  className="rounded-2xl h-10 w-10 min-h-10 min-w-10 cursor-pointer"
                  src={userImage}
                  alt="person"
                  onClick={() =>imageInputRef.current?.click()}
                />
                <input
                  ref={imageInputRef}
                  id="imageInput"
                  name='file'
                  type='file'
                  accept='image/png, image/jpeg'
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </div>
              <p className='ml-2 w-4/6 px-5' style={{ color: 'white' }}>Welcome, {loginUsername}!</p>
              <button style={{color:'red'}} className="outline-none rounded-lg" onClick={async () => { await handleLogout(); }}>
                  LogOut
              </button>
            </div>
          </>
        )}
      </div>
    ); 
}

export default AuthenticationSection;