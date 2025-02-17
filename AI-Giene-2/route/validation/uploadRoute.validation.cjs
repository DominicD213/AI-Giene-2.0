const validator = require('validator');
const path = require('path');

const validatedUpload = (file) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedTypes.includes(file.mimetype)) {
        throw new Error("The file must be either JPG, PNG, or PDF.");
    }

    const sanitizeFileName = validator.escape(path.basename(file.originalname));

    // Return the sanitized file name clearly
    return { sanitizeFileName };
};

module.exports = validatedUpload;
