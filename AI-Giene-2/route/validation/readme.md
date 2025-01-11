<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Environment Validation</h1>
    <p>
        The provided code uses the <code>joi</code> library to define a schema for validating environment variables necessary for an application. 
        The schema, <code>envVarSchema</code>, specifies four key environment variables: <code>DB_URI</code> (required string for the database URI), 
        <code>PORT</code> (positive number with a default value of 3000), <code>ORIGIN</code> (required string for specifying the allowed origin in CORS), 
        and <code>OPENAI_API</code> (required string for the OpenAI API key or URL). These variables are essential for the application’s proper functioning, 
        and the schema ensures that they are correctly set in the environment before the application runs.
    </p>
    <p>
        The schema also includes <code>.unknown()</code>, which allows additional environment variables to be present without causing validation errors. 
        This provides flexibility for including other variables that might be needed by different parts of the application. By using this schema, 
        the application ensures that all required environment variables are present and properly configured before starting. 
        The <code>envVarSchema</code> is then exported to be used in other parts of the application where environment variable validation is needed.
    </p>

    <h1>Login Validation</h1>
    <p>
        The provided code defines a <code>loginValidation</code> function that uses the <code>validator</code> library to validate and sanitize user input 
        for login functionality. The function first checks that the username consists only of alphanumeric characters using <code>validator.isAlphanumeric</code>. 
        If the username does not meet this criterion, an error message is returned indicating that the username must be alphanumeric. The password is then validated 
        for length, ensuring it has at least 8 characters using <code>validator.isLength</code>. If the password is too short, an error message is returned specifying 
        the required length.
    </p>
    <p>
        The function also enforces password complexity by using a regular expression that ensures the password contains at least one letter, one number, and one 
        special character. If the password does not match the pattern, an error message is returned outlining the required password format. After validation, 
        the username is sanitized using <code>validator.escape</code> to remove any potentially malicious characters, while the password is left unchanged for security reasons. 
        The function then returns an object indicating whether the input is valid, along with the sanitized data if the validation passes. If any validation fails, 
        the appropriate error message is provided.
    </p>

    <h1>OpenAI Response Validation</h1>
    <p>
        The provided code defines a <code>sanitizedRequest</code> function that uses the <code>validator</code> library to sanitize and validate a query parameter in 
        a request. The function first checks whether the query is alphanumeric using <code>validator.isAlphanumeric</code>. If the query contains non-alphanumeric 
        characters, it responds with a 400 status code and an error message, indicating that the query must be alphanumeric. This ensures that the query input is 
        restricted to letters and numbers, which can help prevent malicious inputs such as SQL injection or other forms of code injection.
    </p>
    <p>
        If the query is valid, it is then sanitized by trimming any extra spaces and escaping any potentially dangerous characters using <code>validator.escape</code>. 
        This sanitization process ensures that any special characters or HTML entities are converted into a safe form, preventing issues such as Cross-Site Scripting (XSS). 
        After sanitization, the function returns an object with the sanitized query, ready for further processing in the application. The function is exported for use 
        in other parts of the application where query validation and sanitization are necessary.
    </p>

    <h1>Sign Up Validation</h1>
    <p>
        This HTML document provides a detailed explanation of the code that sets up user authentication and session management routes in an Express application. 
        The first paragraph explains how the main router is set up with routes for user signup, login, and logout, and how the authenticate middleware ensures that 
        only logged-in users can access certain routes. The second paragraph further elaborates on the session-related routes grouped under <code>/session-status</code>, 
        which manage the session state, handle OpenAI responses, and retrieve the user's query history. It also explains how the <code>uploadRoute</code> handles file 
        uploads and requires both authentication and file upload middleware. The session-related routes are organized under a sub-router for better modularity, and the 
        <code>createRouter</code> function is exported for use in other parts of the application.
    </p>

    <h1>Upload Route Validation</h1>
    <p>
        The code provided defines a validation function, <code>validatedUpload</code>, which checks the type of a file and sanitizes its filename. First, the function 
        checks whether the file's MIME type is one of the allowed types (JPEG, PNG, or PDF) by comparing it against an array of accepted MIME types. If the file type 
        does not match, it returns a 500 error with a message stating that the file must be in JPG, PNG, or PDF format. If the file type is valid, the function then 
        sanitizes the filename using the <code>validator.escape()</code> method, which escapes potentially dangerous characters in the file's original name to prevent 
        security issues such as injection attacks. Finally, the function returns the sanitized filename.
    </p>
</body>
</html>
