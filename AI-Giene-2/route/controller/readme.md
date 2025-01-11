<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>The Controller File Overview</h1>
    <p>This file will be used to hold all the functions that are needed in our routes.</p><br>
    <h2>The controller.converseWithChatGPT.cjs file</h2>
    <p>This file will be used to call on the API and make a handshake. It specifies the model that we are working in and asynchronously waits for the stream to be created, connecting the user to the ChatGPT AI. An empty string is then created to store the AI response. Chunks are pulled out of the stream, optimizing performance by reducing data loss due to lag. The content is added to the full response string and returned for use in the application.</p><br>
    <h2>The controller.login.js file</h2>
    <p>This code defines an asynchronous login function that handles user authentication. The function begins by extracting the username and password from the request body. It uses a loginValidation function to ensure the credentials meet required standards. If the credentials are invalid, it returns a 400 Bad Request status. Once validated, it checks for the user in the database, comparing the sanitized username with stored data. If a user is found, bcrypt.compare verifies the password. If valid, the user's session is created, and a 200 OK response is sent with user details. Errors during the process trigger a 500 Internal Server Error.</p><br>
    <h2>The controller.logout.cjs file</h2>
    <p>The logout function is asynchronous and handles user logout by destroying the session. It uses req.session.destroy to terminate the session and sends a 500 error if there’s an issue. Once successfully destroyed, the session cookie is cleared, and a 200 OK response with a “Logout successful” message is returned.</p><br>
    <h2>The controller.longtermHistory.cjs file</h2>
    <p>This file contains a function that retrieves the long-term history of the current user. It uses setImmediate to ensure execution on the next iteration of the event loop, preventing performance issues. The function extracts the user ID from the active session and sanitizes the query to prevent malicious input. It then uses the query to retrieve the user’s search history.</p><br>
    <h2>The controller.openAIResponse.cjs file</h2>
    <p>The openAIResponse function handles requests related to OpenAI’s API. It checks if the user is authenticated and returns a 401 Unauthorized response if not. The function sanitizes the query before sending it to OpenAI’s API via converseWithChatGPT. After receiving the response, it saves both the query and response in the database. The query and response are emitted to connected clients via WebSocket for real-time updates, and a JSON response is sent to the client. Errors are logged, and a 500 error is returned if an issue arises.</p><br>
    <h2>The controller.recentHistory.cjs file</h2>
    <p>The recentHistory function retrieves the query history of an authenticated user. It verifies the session to ensure the user is logged in, then fetches the user’s ID and queries the UserQueries collection for related data. The retrieved data is returned as a JSON response. If an error occurs during the process, a 500 Internal Server Error is returned.</p><br>
    <h2>The controller.sessionStatus.cjs file</h2>
    <p>The sessionStatus function checks if the user has an active session. If a session is found, it returns a 200 OK response with user details. If no active session exists, it sends a 401 Unauthorized response.</p><br>
    <h2>The controller.signup.cjs file</h2>
    <p>The signup function handles user registration. It validates the input data using the signUpValidation function and checks if the username or email is already taken. If valid, it hashes the password and saves the user to the database. If successful, a 201 response is returned, or a 500 error is sent if an issue occurs.</p><br>
    <h2>The controller.validateUpload.cjs file</h2>
    <p>The uploadRoute function handles file uploads. It verifies the user’s session and checks for the presence of a file. The function ensures that the file format is valid (JPG, PNG, PDF). If the file is valid, it uploads the file using global.gfs.openUploadStream. Upon completion, it updates the user's record with the file’s ID. Errors during the process are logged, and a 500 error is returned if necessary.</p><br>
    <h2>The giene.controller.cjs file</h2>
    <p>This file imports various controller modules for handling different routes in the application, such as user authentication, AI interactions, and user query history. After importing, it exports them as an object, making it easy to manage and access these functionalities throughout the application. The exported object groups the controllers logically for better organization and scalability.</p>
</body>
</html>
