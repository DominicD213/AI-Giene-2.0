<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Express Routes for User Authentication and Session Management</h1>
    
    <p>
        The code defines routes for user authentication and session management in an Express application. 
        First, it sets up the main router and includes routes for user signup, login, and logout. These routes call controller functions like 
        <code>signup</code>, <code>login</code>, and <code>logout</code> that handle the logic for registering users, authenticating them, and logging them out. 
        The <code>authenticate</code> middleware is also created to protect certain routes by checking if the user is logged in (via session data). 
        If the user is not authenticated, the middleware responds with a 401 Unauthorized error. Otherwise, it allows the request to continue.
    </p>

    <p>
        Additionally, the router sets up session-related routes grouped under <code>/session-status</code>. These routes manage the status of the current session, handle OpenAI responses, and retrieve recent or long-term history. 
        The <code>openAIResponse</code> route uses the <code>io</code> object to handle socket communication, while <code>recentHistory</code> and <code>longtermHistory</code> fetch the user's query history. 
        The <code>uploadRoute</code> handles file uploads and requires both authentication and the <code>fileUploadMiddleware</code> for processing. 
        Finally, the session-related routes are mounted on a sub-router under <code>/login</code>, organizing the session management functionality separately from the core routes. 
        The <code>createRouter</code> function is exported to be used in the application.
    </p>
</body>
</html>
