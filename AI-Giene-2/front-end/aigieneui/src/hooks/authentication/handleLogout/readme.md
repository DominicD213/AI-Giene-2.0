useHandleLogout Hook
Overview
The useHandleLogout hook is responsible for handling user logout functionality in the application. It communicates with the backend API to log out the user and dispatches necessary Redux actions to reset authentication and session states.

Functionality
Calls the logout API to terminate the user session.
Updates the Redux store by:
Setting sessionActive to false.
Clearing the user information (setUser, setId).
Resetting the user image.
Clearing stored queries.
Changing the loading state.
Dependencies
This hook relies on the following:

React Redux (useDispatch) – To dispatch actions.
Redux Actions:
setSessionActive(false): Marks the session as inactive.
setUser(''): Clears the user data.
setId(''): Clears the user ID.
setUserImage(''): Resets the user profile image.
toggleUserImage(): Toggles the user image state.
clearRequest(): Clears stored queries from the session.
changeloadingState(): Resets the loading state.
API Service:
logoutAPI(): Sends a request to log out the user from the backend.
Error Handling
If the API request fails, it logs an error message to the console.
If the response is unsuccessful, it logs "Logout failed".
Return Value
The handleLogout function is returned, which should be invoked when the user logs out.