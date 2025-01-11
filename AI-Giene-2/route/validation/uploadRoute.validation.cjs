const validator = require('validator');

const validatedUpload = (file) =>{
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if(!allowedTypes.includes(file.mimetype)){
        return res.status(500).send("The File Must Either A JPG, PNG, PDF.")
    }

    const sanitizeFileName = validator.escape(path.basename(file.originalname));
    
    return { file : sanitizeFileName};
}

module.exports =  validatedUpload;