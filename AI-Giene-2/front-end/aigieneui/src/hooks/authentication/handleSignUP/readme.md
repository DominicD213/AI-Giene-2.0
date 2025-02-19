useSignUp Hook
Overview
The useSignUp hook is a custom React hook that manages the sign-up process in the application. It retrieves user credentials from the Redux store, validates the input, communicates with the sign-up API, and handles errors appropriately.

Functionality
Retrieves username, password, and email from Redux.
Validates if all required fields are filled.
Calls the handleSignUpApi function to interact with the backend sign-up API.
Handles API responses:
If successful (201 status), toggles the sign-up state.
If failed, captures and dispatches error messages.
Dependencies
This hook relies on the following:

React Redux (useDispatch, useSelector) – To dispatch actions and access state.
Redux Actions:
setError(errorMessage): Sets the error message in case of validation or API failure.
toggleSignUp(): Toggles the sign-up state upon successful registration.
API Service:
useSignUpApi(): Custom API hook that handles sign-up requests.
Error Handling
If required fields are missing, it sets an error message: "Fill out all signup information".
If the API returns an error, it logs the response and dispatches the specific error message.
If there is no response, a general "Signup failed" message is set.
Return Value
handleSignUp: A function that initiates the sign-up process when called.