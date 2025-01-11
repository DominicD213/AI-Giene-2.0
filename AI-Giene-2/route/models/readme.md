<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>

<h1>Mongoose Schemas and Models</h1>

<p>The provided code defines Mongoose schemas and models for handling user data and queries in a MongoDB database. The <code>userSchema</code> is designed for user authentication, including fields for the username, password, email, a reference to a user image (stored in GridFS), 
    and the entry date. To secure user passwords, a pre-save hook is used to hash the password before saving it to the database using bcrypt. This ensures that passwords are stored in a secure, encrypted form. Additionally, the schema includes a method 
    <code>comparePassword</code> to compare the stored password with a candidate password during login, enhancing security.</p>

<p>The <code>userQueriesSchema</code> is used to handle user queries, storing the user reference (linked to the <code>User</code> model), the query itself, and the corresponding response. 
    This schema facilitates logging and tracking user inquiries and their responses. Both schemas are compiled into Mongoose models, <code>User</code> and <code>UserQueries</code>, which interact with the 
    respective collections in the database. By using these models, you can perform various operations such as user registration, password comparison, and storing user queries and their responses in the database. The models are exported for use in other parts of the application.</p>

</body>
</html>
