const signUpValidation = require("../validation/signUp.validation.cjs");
const Giene = require("../models/schema.cjs");

// Signup function
const signup = async (req, res) => {
    const { username, password, email } = req.body;
    console.log('Received body:', req.body);

    const validatedResults = signUpValidation(username, password, email);
    console.log('Validation Results:', validatedResults);

    // If validation fails, send the validation error message
    if (!validatedResults.isValid) {
        return res.status(400).json({
            message: validatedResults.message
        });
    }

    const { sanitizedData } = validatedResults;
    const { username: sanitizedUsername, email: sanitizedEmail, password: sanitizedPassword } = sanitizedData;

    try {
        // Check if either the username or email already exists in the database
        const existingUser = await Giene.User.findOne({
            $or: [{ username: sanitizedUsername }, { email: sanitizedEmail }]
        });

        // If user already exists, send error response
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Username or email already exists',
                field: existingUser.username === sanitizedUsername ? 'username' : 'email' // You can specify which field is causing the conflict
            });
        }

        // Create a new user without hashing the password
        const newUser = new Giene.User({
            username: sanitizedUsername,
            password: sanitizedPassword, // Password is stored as plain text here (not recommended)
            email: sanitizedEmail,
        });

        // Save the new user
        await newUser.save();

        return res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = signup;
