const fs = require('fs');
const multer = require('multer');
const path = require('path');

const uploadDir = path.join(process.cwd(), 'public');

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const originalName = encodeURIComponent(path.parse(file.originalname).name).replace(/[^a-zA-Z0-9]/g, '');
        const timestamp = Date.now();
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, `${originalName}_${timestamp}${extension}`);
    }
});

const fileUploadMiddleware = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, 
    fileFilter: (req, file, cb) => {
        console.log('Received file:', file);
        
        if (!file || !file.originalname) {
            console.error('File or file.originalname is undefined');
            return cb(new Error('Invalid file data'), false);
        }

        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        // console.log('Mimetype:', file.mimetype);
        // console.log('Extension:', path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            // console.log('File type is valid:', file.originalname);
            return cb(null, true);
        }

        console.error('Invalid file type for:', file.originalname);
        cb(new Error('Invalid file type'));
    }
}).single('file');

module.exports = fileUploadMiddleware;
