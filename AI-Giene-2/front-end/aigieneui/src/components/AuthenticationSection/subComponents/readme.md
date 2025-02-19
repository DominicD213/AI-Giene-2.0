# LoginButton Component

The `LoginButton` component is a React component that provides a login form for users. It manages the login state using Redux and handles form submissions, login validation, and error handling.

## Features

- Displays a login form with fields for username and password.
- Submits login credentials to the backend through the `useLogin` hook.
- Handles loading and error states during the login process.
- Toggles visibility of the login form and clears errors when the "Cancel" button is clicked.
- Supports Redux-based state management for login credentials and error messages.

## Dependencies

This component relies on the following libraries:

- **react-redux**: For managing state with Redux.
- **React**: For creating and rendering the component.
- **Custom hooks**: `useLogin` for handling the login logic.

## File Structure

```plaintext
src/
├── components/
│   └── LoginButton.tsx  # LoginButton component file
└── store/
    └── Authentication/
        ├── loginCredentials.ts  # Redux actions and reducers for login credentials
        ├── authError.ts         # Redux actions and reducers for handling login errors
        └── loginState.ts        # Redux actions and reducers for login state visibility

# SignUpButton Component

The `SignUpButton` component provides a sign-up form that allows users to create an account by providing a username, password, and email. It handles the sign-up logic, manages form submission, and interacts with Redux to store user credentials and handle errors.

## Features

- Displays a form to input a username, password, and email.
- Submits the form data to handle user registration.
- Displays error messages if the sign-up process fails.
- Allows the user to toggle between the sign-up and login states.

## Dependencies

This component relies on the following libraries:

- **react-redux**: For managing application state with Redux.
- **React**: For component rendering.
- **Custom hooks**: `useSignUp` for handling the sign-up logic.

## File Structure

```plaintext
src/
├── components/
│   └── SignUpButton.tsx  # SignUpButton component file
└── store/
    └── Authentication/
        ├── singUpCredentails.ts  # Redux actions and reducers for sign-up credentials
        ├── authError.ts         # Redux actions and reducers for handling errors
        └── singUpState.ts       # Redux actions and reducers for managing sign-up state visibility
