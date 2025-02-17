const mongoose = require("mongoose");

const streamImageFromGridfs = async (imageUrl) => {
    try {
        let imageId;
        
        // If the imageUrl contains base64 data, extract the ID portion.
        if (imageUrl.includes("data:image")) {
            imageId = imageUrl.split(",").pop();  // Base64 encoded image data
        } else {
            imageId = imageUrl;  // Assumed to be the image ID directly
        }

        // console.log("Extracted Image ID:", imageId);

        // Ensure the imageId is valid (in case it's an ObjectId)
        if (!mongoose.Types.ObjectId.isValid(imageId)) {
            throw new Error("Invalid image ID");
        }

        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            bucketName: "uploads",
        });

        const objectId = new mongoose.Types.ObjectId(imageId);
        const file = await bucket.find({ _id: objectId }).toArray();

        // If no file found, throw an error
        if (!file || file.length === 0) {
            throw new Error("Image not found");
        }

        const contentType = file[0].contentType || "image/jpeg";
        
        // Stream the image data and convert it to Base64
        const stream = bucket.openDownloadStream(objectId);
        let imageDataBuffer = [];  // To accumulate the image data

        return new Promise((resolve, reject) => {
            stream.on('data', (chunk) => {
                imageDataBuffer.push(chunk);  // Accumulate the data chunks
            });

            stream.on('end', () => {
                // Concatenate the chunks and convert to base64
                const buffer = Buffer.concat(imageDataBuffer);
                const base64Image = `data:${contentType};base64,${buffer.toString('base64')}`;
                resolve(base64Image);
            });

            stream.on('error', (err) => {
                reject(err);
            });
        });
    } catch (error) {
        // console.error("Error retrieving image:", error);
        throw new Error("Error retrieving image: " + error.message);
    }
};

module.exports = streamImageFromGridfs;
