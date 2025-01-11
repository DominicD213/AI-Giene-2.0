const validator = require('validator');

const loginValidation = (username, password) => {
    // Validate username
    if (!validator.isAlphanumeric(username)) {
        return { isValid: false, message: "Username must be alphanumeric." };
    }

    // Validate password length
    if (!validator.isLength(password, { min: 8 })) {
        return { isValid: false, message: "Password needs to be a minimum of 8 characters." };
    }

    // Enforce password complexity (optional)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: "Password must contain at least one letter, one number, and one special character." 
        };
    }

    // Sanitize username (password is not sanitized for security reasons)
    const sanitizedUsername = validator.escape(username.trim());

    return { 
        isValid: true, 
        sanitizedData: { username: sanitizedUsername, password } 
    };
}

module.exports = loginValidation;
