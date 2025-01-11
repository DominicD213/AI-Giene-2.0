const loginValidation = require("../validation/login.validation.cjs");
const bcrypt = require("bcrypt");
const Giene = require("../models/schema.cjs");
// Login route
const login = (async (req,res) => {
    const { username, password } = req.body;

    try {
        const validLogin = loginValidation(username,password);

        if(!(await validLogin).isValid){
            res.status(400).send("Enter valid login credentails");
        }

        const {sanitzedLogin} = validLogin;
        
        const {username: sanitizedUsername, password: sanitizedPassword} = sanitzedLogin

        const user = await Giene.User.findOne({ username: sanitizedUsername });

        if (!user) {
            return res.status(401).send('Username not found');
        }

        if(!validLogin.isValid){
            res.status(400).send(validLogin.message);
        }

        const isPasswordValid = await bcrypt.compare({password: sanitizedPassword});

        if (!isPasswordValid) {
            return res.status(401).send('Invalid password');
        }

        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            image: user.userImage,
        };

        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).send('Error saving session');
            }
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    username: user.username,
                    email: user.email,
                    image: user.userImage
                }
            });
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Error logging in');
    }
})

module.exports = login