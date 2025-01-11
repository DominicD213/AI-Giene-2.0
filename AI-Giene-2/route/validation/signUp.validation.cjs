const validator = require('validator');;

const signUpValidation = (username, email, password) => {
    // Validate username
    if (!validator.isAlphanumeric(username)) {
        return { isValid: false, message: "Username must be alphanumeric." };
    }

    // Validate email
    if (!validator.isEmail(email)) {
        return { isValid: false, message: "Invalid email address." };
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

    // Sanitize username and email
    const sanitizedUsername = validator.escape(username.trim());
    const sanitizedEmail = validator.normalizeEmail(email.trim());
    const sanitizedPassword = validator(password.trim());

    return { 
        isValid: true, 
        sanitizedData: { username: sanitizedUsername, email: sanitizedEmail, password:sanitizedPassword }
    };
};


module.exports =  signUpValidation;