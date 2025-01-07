const Giene = require("../models/schema");
const bcrypt = require('bcrypt');
const validator = require('validator');
const { sanitize } = require('validator');
const path = require("path")

//signup function
const signup  = ( async (req, res) => {
    const { username, password, email } = req.body;
         if (!validator.isAlphanumeric(username) || ! validator.isEmail(email)){
            return res.status(400).send("Enter A Correct Email.")
         }
        
        //Sanitized Username and Passoword
        const sanitizedUsername = sanitize(username.trim());
        const sanitizeEmail = sanitize(email.trim())
        
        try {
            const existingUser = await Giene.User.findOne({ $or: [{sanitizedUsername }, { sanitizeEmail }] });

            if (existingUser) {
                return res.status(400).send('Username or email already exists');
            }
            const hashedPassword = await bcrypt.hash(password,10);

            const newUser = new Giene.User(
                {   username: sanitizedUsername,
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

// Login route
const login = (async (req,res) => {
    const { username, password } = req.body;

    try {
        const user = await Giene.User.findOne({ username: username.trim() });

        if (!user) {
            return res.status(401).send('Username not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

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

const sessionStatus = (async (res,req) =>{
    console.log('Session status route accessed');
        if (req.session.user) {
            console.log('User session found:', req.session.user);
            return res.status(200).json({ active: true, user: req.session.user });
        } else {
            console.log('No active session');
            return res.status(401).json({ active: false });
        }
})
const logout =  (async(res,req) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }
        res.clearCookie('connect.sid');
        return res.status(200).send('Logout successful');
    });
})

const openAIResponse = (async (res,req) =>{
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const query = req.body.query;
        const response = await converseWithChatGPT(query);

        const userId = req.session.user.id;
        const newRequest = new Giene.UserQueries({
            user: userId,
            query: query,
            response: response,
        });
        await newRequest.save();

        io.emit('newQuery', { query, response });

        return res.status(200).json({ response });
    } catch (error) {
        console.error('OpenAI API error:', error);
        return res.status(500).send('Error communicating with OpenAI API');
    }
})

const recentHistory = (async(res,req) =>{
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const userId = req.session.user.id;
        const userQueries = await Giene.UserQueries.find({ user: userId })
            .select('query response');

        return res.status(200).json(userQueries);
    } catch (error) {
        console.error('Error retrieving user queries:', error);
        return res.status(500).send('Internal Server Error');
    }
})

const longtermHistory = (async (res,req) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const userId = req.session.user.id;
        const userSearchHistory = validator.escape(req.query.query || "");

        const query = { user: userId };
        if (userSearchHistory) {
            query.query = { $regex: userSearchHistory, $options: 'i' };
        }

        const userSearch = await UserQueries.find(query)
            .select('query response')
            .sort({ createdAt: 1 });

        return res.status(200).json(userSearch);
    } catch (error) {
        console.error('Error retrieving user queries:', error);
        return res.status(500).send('Internal Server Error');
    }
})

const uploadRoute = (async (ree, req) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    console.log('Received file:', req.file);

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if(!allowedTypes.includes(req.file.mimetype)){
        return res.status(500).send("The File Must Either A JPG, PNG, PDF.")
    }

    const sanitizeFileName = validator.escape(path.basename(req.file.originalname));

    if (!global.gfs) {
        console.error('GridFS not initialized');
        return res.status(500).send('File system not initialized');
    }

    try {
        const {buffer} = req.file;
        console.log('Starting upload for file:', sanitizeFileName);

        const stream = global.gfs.openUploadStream(sanitizeFileName);
        stream.end(buffer);

        stream.on('finish', async (file) => {
            console.log('Upload finished for file:', file.filename);

            try {
                const userId = req.session.user.id;
                const user = await Giene.User.findById(userId);
                if (!user) {
                    return res.status(404).send('User not found');
                }
                user.userImage = file._id;
                await user.save();
                console.log('User updated with image ID:', file._id);
                return res.status(201).send({ fileId: file._id });
            } catch (error) {
                console.error('Error updating user:', error);
                return res.status(500).send('Internal Server Error');
            }
        });

        stream.on('error', (err) => {
            console.error('Error uploading file:', err);
            return res.status(500).send('Internal Server Error');
        });
    } catch (error) {
        console.error('Error handling file upload:', error);
        return res.status(500).send('Internal Server Error');
    }
})
module.exports = {signup, login, sessionStatus, logout,openAIResponse, recentHistory, longtermHistory, uploadRoute}