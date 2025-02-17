const Giene = require('../models/schema.cjs');
const deletingOldUserImages = require("../controller/controller.deleting.old.userImage.cjs");
const validatedUpload = require("../validation/uploadRoute.validation.cjs");
const fs = require('fs')

const uploadRoute = async (req, res) => {
    console.log('Received request for file upload');

    if (!req.session.user) {
        console.error('User not authenticated');
        return res.status(401).send('Unauthorized');
    }

    if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).send('No file uploaded');
    }

    console.log('Received file:', req.file);

    if (!global.gfs) {
        console.error('GridFS not initialized');
        return res.status(500).send('File system not initialized');
    }

    try {
        const validatedFile = validatedUpload(req.file);
        console.log('Validated file:', validatedFile);

        if (!validatedFile || !validatedFile.sanitizeFileName) {
            console.error('Invalid file type. Only JPG, PNG, PDF, JPEG are allowed.');
            return res.status(400).send("Invalid file type. Only JPG, PNG, PDF, JPEG are allowed.");
        }

        const filePath = req.file.path;
        console.log('File path:', filePath);

        if (!fs.existsSync(filePath)) {
            console.error('File does not exist at path:', filePath);
            return res.status(400).send('File not found');
        }

        // Open a GridFS upload stream
        const stream = global.gfs.openUploadStream(validatedFile.sanitizeFileName, {
            contentType: req.file.mimetype
        });

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(stream);

        stream.on('finish', async () => {
            console.log('Upload finished.');

            // Retrieve the uploaded file details manually
            const uploadedFile = await global.gfs.find({ filename: validatedFile.sanitizeFileName }).toArray();

            if (!uploadedFile || uploadedFile.length === 0) {
                console.error('File upload finished, but no file found in GridFS.');
                return res.status(500).send('Error: File upload failed, file not found.');
            }

            const fileId = uploadedFile[0]._id;
            console.log('File successfully uploaded with ID:', fileId);

            try {
                const userId = req.session.user.id;
                const user = await Giene.User.findById(userId);

                if (!user) {
                    console.error('User not found');
                    return res.status(404).send('User not found');
                }

                // Get the current (old) image ID to delete later
                const oldImageID = user.userImage;

                // Save the new image ID to the user's profile
                user.userImage = fileId;
                await user.save();


                // Now delete the old image, if any
                if (oldImageID && oldImageID !== fileId) {
                    //console.log('Deleting old image with ID:', oldImageID);
                    await deletingOldUserImages(oldImageID);  // Await deletion
                    //console.log('Successfully deleted old image');
                } else {
                    console.log('No Previous Images or same image.');
                }

                return res.status(201).json({ fileId });
            } catch (error) {
                console.error('Error updating user:', error);
                return res.status(500).send('Error updating user');
            }
        });

        stream.on('error', (err) => {
            console.error('Error uploading file:', err);
            return res.status(500).send('Error uploading file');
        });

    } catch (error) {
        console.error('Error in file upload handling:', error);
        return res.status(500).send('Error in file upload handling');
    }
};

module.exports = uploadRoute;
