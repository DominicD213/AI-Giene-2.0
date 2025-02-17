const mongoose = require('mongoose');

const deletingOldUserImages = async (oldImageID) => {
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });

    if (oldImageID) {
        try {
            const objectId = mongoose.Types.ObjectId.createFromTime(oldImageID);
            await bucket.delete(objectId); // Delete the old image from GridFS
            //console.log(`Successfully deleted old image with ID: ${oldImageID}`);
        } catch (error) {
            console.error('Error deleting old image:', error);
        }
    }
};

module.exports = deletingOldUserImages;
