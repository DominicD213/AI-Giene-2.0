const signUpValidation = require("../validation/signUp.validation.cjs");
const bcrypt = require("bcrypt");
const Giene = require("../models/schema.cjs");

//signup function
const signup  = ( async (req, res) => {
    const { username, password, email } = req.body;
        const validatedResults = signUpValidation(username, email, password);
        
        if (!validatedResults.isValid){
            return res.status(400).send("Please enter valid input data.")
        }

        const {sanitizedData} =  validatedResults;
        const {username: sanitizedUsername , email : sanitizeEmail, password: sanitizedPassword} = sanitizedData

        try {
            const existingUser = await Giene.User.findOne({ $or: [{username:sanitizedUsername }, { email:sanitizeEmail }] });

            if (existingUser) {
                return res.status(400).send('Username or email already exists');
            }
            const hashedPassword = await bcrypt.hash({password:sanitizedPassword});

            const newUser = new Giene.User(
                {   
                    username: sanitizedUsername,
                    password:hashedPassword,
                    email: sanitizeEmail, 

                });
            await newUser.save();


            return res.status(201).send('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).send('Internal Server Error');
        }
})

module.exports =  signup;