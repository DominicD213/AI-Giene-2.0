<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>CORS Middleware</h1>
    <p>
        The code defines a middleware function, <strong>corsMiddlewareFunction</strong>, which configures and applies 
        Cross-Origin Resource Sharing (CORS) settings for an Express application. It uses the <code>cors</code> package to 
        allow or restrict cross-origin requests from different domains. The CORS options are defined in the <code>corsOptions</code> 
        object, specifying the allowed origins (including a dynamic origin from a configuration file and the local development 
        server URL), the HTTP methods that are allowed (GET, POST, PUT, DELETE, OPTIONS), and the headers that can be included 
        in requests (Content-Type, Authorization). Additionally, the <code>credentials: true</code> setting allows cookies or 
        authentication data to be sent with requests.
    </p>
    <p>
        The middleware is applied using <code>cors(corsOptions)</code>, which is then invoked with <code>req</code>, 
        <code>res</code>, and <code>next</code> to check each incoming request's origin and ensure it meets the defined CORS rules. 
        If there is an issue with applying the CORS settings, the error is caught, logged, and a 400 status response is sent back 
        indicating a "CORS Options Issue." The middleware function is exported to be used in other parts of the application to ensure 
        consistent CORS handling across routes.
    </p><br>
    <h1>File Upload Middleware</h1>
    <p>
        This code configures a file upload middleware using the <code>multer</code> package, which is designed for handling multipart 
        form-data (typically used for file uploads in Express applications). The middleware uses memory storage, meaning files will be 
        stored in memory (as buffers) instead of being saved directly to the filesystem. The <code>limits</code> option is set to restrict 
        the file size to 1MB (1,000,000 bytes). The <code>fileFilter</code> function ensures that only files with valid data are processed, 
        checking both the file’s original name and its MIME type to ensure it matches one of the allowed types (JPEG, JPG, or PNG). 
        If a file does not meet these criteria, an error is returned.
    </p>
    <p>
        The middleware is then exported as a function that processes a single file under the field name <code>file</code>. It uses the 
        <code>multer</code> package to handle the file upload, applying the defined storage, file size limit, and file type validation 
        rules. If the file is valid, it proceeds with the upload; otherwise, an error message will be generated. This middleware is typically 
        used in routes that handle file uploads, ensuring files are validated and processed properly before being saved or further handled.
    </p><br>
    <h1>Session Middleware</h1>
    <p>
        This code sets up an Express session middleware with MongoDB as the session store, using the <code>express-session</code> 
        package and the <code>connect-mongo</code> library for persisting session data in MongoDB. The <code>crypto</code> module 
        is used to generate a secure, random 32-byte string for the session secret key. The <code>sessionMiddleware</code> configuration 
        object specifies various session options such as <code>resave</code>, <code>saveUninitialized</code>, and the session store, 
        which is set to use MongoDB with a connection URI from the configuration (<code>dbURI</code>). The session will be stored in 
        a MongoDB collection named "sessions" and will have a time-to-live (TTL) of 14 days.
    </p>
    <p>
        The cookie configuration ensures secure transmission by enabling the <code>secure</code> flag in production environments and 
        sets <code>httpOnly</code> to true for additional security (to prevent access via JavaScript). The <code>sameSite</code> 
        attribute is set to <code>lax</code>, providing some cross-site request protection. This session setup is intended to manage 
        user sessions in a secure and efficient manner, ensuring that session data is stored and retrieved properly across different 
        requests while maintaining security best practices for sensitive information.
    </p>
</body>
</html>