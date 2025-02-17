import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setSessionActive } from "../../store/Authentication/loginCredentials";
import { setUserImage, toggleUserImage } from "../../store/Authentication/userImage";
import IconPerson from "../../Assets/personPlaceHolder.png";
import linkSessionStatusApi from "../../services/sessionStatusApi";
import { RootState } from "../../store/store";

const useCheckSessionStatus = () => {
  const dispatch = useDispatch();
  const sessionState = useSelector((state: RootState) => state.login.sessionActive); // Get current session state
  const userState = useSelector((state: RootState) => state.login.user); // Get user state

  // References to track previous state values to prevent unnecessary dispatches
  const prevSessionState = useRef(sessionState);
  const prevUserState = useRef(userState);
  const prevUserImage = useRef<string | null>(userState ? IconPerson : null);

  const checkSessionStatus = useCallback(async () => {
    try {
      console.log("Fetching session status...");
      const { sessionStatusApi } = linkSessionStatusApi();
      const response = await sessionStatusApi();

      console.log("Session status data:", response.data);

      if (response.data && response.data.active) {
        // Only update session state if it actually changed
        if (prevSessionState.current !== true) {
          console.log("Dispatching setSessionActive: true");
          dispatch(setSessionActive(true));
          prevSessionState.current = true;
        }

        // Only update user state if it changed
        if (prevUserState.current !== response.data.user.username) {
          console.log("Dispatching setUser:", response.data.user.username);
          dispatch(setUser(response.data.user.username));
          prevUserState.current = response.data.user.username;
        }

        // Avoid unnecessary re-dispatching of user image
        const userImage = response.data.user.userImage || IconPerson;
        if (userImage !== prevUserImage.current) {
          console.log("Dispatching setUserImage:", userImage);
          dispatch(setUserImage(userImage));
          dispatch(toggleUserImage());
          prevUserImage.current = userImage;
        }
      } else {
        // Ensure we only update session state when needed
        if (prevSessionState.current !== false) {
          console.log("Dispatching setSessionActive: false");
          dispatch(setSessionActive(false));
          prevSessionState.current = false;
        }
      }
    } catch (error) {
      console.error("Error checking session status:", error);
    }
  }, [dispatch]); // Keep dependencies minimal

  return checkSessionStatus;
};

export default useCheckSessionStatus;
