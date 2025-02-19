SessionQuery.tsx - Component Documentation
Overview
The SessionQuery.tsx component is part of the AI-Giene application. It is responsible for managing the session queries, checking session status, fetching query history, and displaying real-time updates from the server. This component integrates with the Redux store and utilizes custom hooks for handling authentication, fetching queries, and managing WebSocket events.

Functionality
Session Checking: It checks if the user is logged in (loginState). If not, it displays an introduction (Intro component).
Real-Time Query Display: It fetches the queries and their responses from the backend and displays them in real-time using WebSockets.
Loading State: Shows a loading indicator while queries are being fetched from the backend.
Error Handling: Displays any error messages if there’s an issue while fetching data.
Scroll to Bottom: Automatically scrolls to the bottom of the query list to show the most recent query.
Features
Session Management: The component checks if a user session is active and ensures that data is fetched accordingly.
Query Display: Displays both user queries and the AI-generated responses in a styled manner.
Real-Time Data Updates: Uses WebSockets to listen for updated data in real time.
Conditional Rendering: If the user is not logged in, it shows an introductory message instead of the query interface.
Dependencies
This component relies on the following libraries and hooks:

React: Main library used for building the UI.
Redux: For managing global state, such as user login status and queries.
WebSocket: For receiving real-time updates from the backend.
Custom Hooks:
useCheckSessionStatus: Checks the current session status (whether the user is logged in).
useFetchQueries: Fetches the queries associated with the active session.
useSocketEvents: Listens for WebSocket events to update the frontend in real-time.