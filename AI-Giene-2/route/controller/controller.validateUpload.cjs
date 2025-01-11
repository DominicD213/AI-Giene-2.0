const Giene = require('../models/schema.cjs')
const validatedUpload = require("../validation/uploadRoute.validation.cjs")


const uploadRoute = (async (res, req) => {
    if (!req.session.user) {
        return res.status(401).send('Unauthorized');
    }

    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    console.log('Received file:', req.file);

    
    if (!global.gfs) {
        console.error('GridFS not initialized');
        return res.status(500).send('File system not initialized');
    }

    setImmediate(async() =>{
            try {
                const validatedFile = validatedUpload(req.file)
        
                const {file:sanitizeFileName} =  validatedFile;
        
                if(!validatedFile || !validatedFile.sanitizeFileName){
                    res.status(500).send("The File Must Either A JPG, PNG, PDF.")
                }
        
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
    })

module.exports = uploadRoute;