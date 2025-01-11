const multer = require('multer');
const path = require('path');

// Configure memory storage
const storage = multer.memoryStorage();

// Define the file upload middleware
const fileUploadMiddleware = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: (req, file, cb) => {
        if (!file || !file.originalname) {
            console.error('File or file.originalname is undefined');
            return cb(new Error('Invalid file data'), false);
        }

        // Check file type (customize as needed)
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error('Invalid file type'));
    }
});

// Export the middleware
module.exports = fileUploadMiddleware.single('file'); 
