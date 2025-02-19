useCheckSessionStatus - Custom Hook Documentation
Overview
useCheckSessionStatus is a custom React hook that handles checking and managing the user's session status. It interacts with the Redux store to update the session state, user details (like username and ID), and user image. The hook also prevents unnecessary state updates by tracking previous values with useRef to avoid redundant dispatches.

Key Responsibilities
Session Management: It verifies if the user session is active and updates the session state accordingly.
User Details Update: Updates the Redux store with the user's username, ID, and image if any of these values have changed since the last check.
Image Management: It ensures the user's profile image is updated only when necessary.
Efficient Dispatching: Uses useRef to track previous values of session state, user details, and user image, ensuring that unnecessary dispatches are avoided.
Functionality
Check Session Status:

Makes an API call to check if the user session is active.
If active, updates the session state and user details if there are changes.
If inactive, updates the session state to false.
User State Update:

Updates the Redux store with the user's username and ID if they differ from previous values.
User Image Management:

Updates the user image in the Redux store only when a new image is provided, or if it has changed since the last check.
Avoid Unnecessary Dispatches:

Uses useRef to keep track of previous state values (session state, username, user image), preventing redundant state updates and improving performance.