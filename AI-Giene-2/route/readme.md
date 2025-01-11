<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Express Application - User Authentication, Session Management, and Validation</h1><br>
    <p>
        This project is an Express-based web application that handles user authentication, session management, and data validation.
        It includes routes for user signup, login, logout, session status management, OpenAI response handling, query history retrieval, and file upload validation.
    </p><br>
    <h2>Features</h2>
    <ul>
        <li><strong>User Authentication</strong>: Routes for user signup, login, and logout.</li>
        <li><strong>Session Management</strong>: Session-related routes for managing the user session, OpenAI responses, and querying history.</li>
        <li><strong>Query Validation</strong>: Validation and sanitization of query parameters to ensure safe data handling.</li>
        <li><strong>File Upload Validation</strong>: Ensures uploaded files are of valid types (JPEG, PNG, PDF) and sanitizes file names.</li>
        <li><strong>Environment Validation</strong>: Uses Joi to validate required environment variables such as <code>DB_URI</code>, <code>PORT</code>, <code>ORIGIN</code>, and <code>OPENAI_API</code>.</li>
    </ul><br>
    <h2>Technologies Used</h2>
    <ul>
        <li><strong>MongoDB:</strong> A NoSQL database used to store data in a flexible, JSON-like format. MongoDB is known for its scalability and high performance, making it an excellent choice for modern applications.</li>
        <li><strong>Node.js</strong>: A JavaScript runtime built on Chrome's V8 JavaScript engine, used to build the server-side application.</li>
        <li><strong>Express</strong>: A web framework for Node.js, providing a robust set of features to develop web and mobile applications.</li>
        <li><strong>Validator.js</strong>: A library used to validate and sanitize user input to ensure the security and integrity of data.</li>
        <li><strong>Joi</strong>: A data validation library used for validating environment variables and user input, ensuring they follow the correct format.</li>
        <li><strong>Socket.io</strong>: A library for real-time communication between the client and the server, used to manage user sessions and OpenAI response handling.</li>
    </ul><br>
    <h2>Installation</h2>
    <ol>
        <li>Clone the repository:
            <pre>git clone https://github.com/DominicD213/AI-Giene-2.0.git</pre>
            <pre>cd your-repository</pre>
        </li>
        <li>Install dependencies:
            <pre>npm install</pre>
        </li>
        <li>Set up environment variables:
            <p>Create a <code>.env</code> file in the root directory with the following values:</p>
            <pre>
DB_URI=your_database_uri
PORT=3000
ORIGIN=http://localhost:3000
OPENAI_API=your_openai_api_key
            </pre>
        </li>
        <li>Run the application:
            <pre>npm start</pre>
        </li>
    </ol><br>
    <h2>Routes</h2>
    <ul>
        <li><strong>POST /signup</strong>: Create a new user.</li>
        <li><strong>POST /login</strong>: Log in an existing user.</li>
        <li><strong>POST /logout</strong>: Log out the user.</li>
        <li><strong>GET /session-status</strong>: Check the status of the current session.</li>
        <li><strong>POST /session-status/openAIResponse</strong>: Handle OpenAI responses (requires authentication).</li>
        <li><strong>GET /session-status/openAIResponse/recent-queries</strong>: Retrieve the user's recent query history.</li>
        <li><strong>GET /session-status/search/history</strong>: Retrieve long-term query history.</li>
        <li><strong>POST /session-status/upload</strong>: Upload files (requires authentication).</li>
    </ul><br>
    <h2>File Upload Validation</h2>
    <p>
        The file upload route ensures that the uploaded file is of one of the following types:
        <ul>
            <li>Image: <code>image/jpeg</code>, <code>image/png</code></li>
            <li>PDF: <code>application/pdf</code></li>
        </ul>
        If the file type is invalid, the system returns an error. Additionally, the file name is sanitized to prevent security issues such as code injection.
    </p><br>
    <h2>Environment Variable Validation</h2>
    <p>
        The application validates the following environment variables using Joi:
        <ul>
            <li><strong>DB_URI</strong>: The URI for the database (required).</li>
            <li><strong>PORT</strong>: The port for the application (default: 3000).</li>
            <li><strong>ORIGIN</strong>: The allowed origin for CORS (required).</li>
            <li><strong>OPENAI_API</strong>: The OpenAI API key or URL (required).</li>
        </ul>
    </p><br>
    <h2>Contributing</h2>
    <p>Feel free to fork the repository, make changes, and submit pull requests. If you encounter any bugs or have suggestions for improvements, please open an issue.</p<br>
    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <code>LICENSE</code> file for details.</p>
</body>
</html>
