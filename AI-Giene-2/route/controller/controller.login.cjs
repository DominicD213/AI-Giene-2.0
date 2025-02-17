const loginValidation = require("../validation/login.validation.cjs");
const { User } = require("../models/schema.cjs");
require('dotenv').config();

// Login route
const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log('Login Request Body:', req.body);
    // console.log('Before login session:', req.session);

    try {
        // Validate login input
        const validLogin = await loginValidation(username, password);
        //console.log("Validation Output:", validLogin);

        if (!validLogin?.isValid || !validLogin?.sanitizedData) {
            return res.status(400).json({ message: "Enter valid login credentials" });
        }

        const { sanitizedData } = validLogin;
        const { username: sanitizedUsername, password: sanitizedPassword } = sanitizedData;

        // Find user in the database
        const user = await User.findOne({ username: sanitizedUsername });
        if (!user) {
            return res.status(401).json({ message: "Username not found" });
        }

        // Use the comparePassword method to check if the passwords match
        const isPasswordValid = await user.comparePassword(sanitizedPassword);
        if (!isPasswordValid) {
            //console.log("Invalid password attempt.");
            return res.status(401).json({ message: "Invalid password" });
        }

        // Ensure session exists before assigning user data
        if (!req.session) {
            return res.status(500).json({ message: "Session not initialized" });
        }

        // Store only the image ID (not base64)
        const userImage = user.userImage ? user.userImage : null;

        // Set session user data (store the image ID, not the base64)
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            userImage: userImage, // Store image ID
        };

        // Save session and send response
        req.session.save((err) => {
            if (err) {
                console.error("Session save error:", err);
                return res.status(500).json({ message: "Error saving session" });
            }

            // console.log("Session successfully saved:", req.session);
            return res.status(200).json({
                message: "Login successful",
                user: {
                    username: user.username,
                    email: user.email,
                    userImage: userImage, // Include image ID in the response
                },
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Error logging in" });
    }
};

module.exports = login;
