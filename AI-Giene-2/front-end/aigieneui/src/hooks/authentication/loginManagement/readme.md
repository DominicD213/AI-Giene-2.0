useLogin Hook
Overview
The useLogin hook is a custom React hook that manages user authentication. It handles user login by validating credentials, making an API request, updating the Redux store, and checking the session status.

Functionality
Validates input: Ensures the user provides both a username and password.
Manages login state: Dispatches actions to update loading state, login status, and error messages.
Performs API request: Calls the loginApi function to authenticate the user.
Handles session updates: Calls checkSessionStatus after a successful login.
Updates user information: Sets the user's profile image in Redux.
Handles errors: Manages different error cases, including server responses and network issues.
Dependencies
This hook relies on the following:

React Redux (useDispatch) – For managing authentication state.
Redux Actions:
setLoading(): Toggles loading state during API request.
setUserImage(image): Updates user profile image in Redux.
toggleLogin(): Changes login status on success.
setError(errorMessage): Sets authentication error messages.
API Service:
useLoginAPI(): Custom API hook for handling login requests.
Session Management:
useCheckSessionStatus(): Ensures session state is updated after login.
Error Handling
Missing Credentials: Displays "Please enter both username and password.".
Server Error: Displays the specific error message returned by the API.
Network Issues: Displays "No response from the server. Please try again later.".
Unexpected Errors: Displays "Login failed due to an unexpected error.".
Return Value
handleLogin(username: string, password: string): Promise<void>
Asynchronously logs in the user and updates session state.