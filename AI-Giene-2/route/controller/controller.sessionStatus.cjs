const streamImageFromGridfs = require("./controller.retrieve.image.cjs");

const sessionStatus = async (req, res) => {
  // console.log('Session status route accessed');

  if (req.session && req.session.user) {
      const userImage = req.session.user.userImage;
      //console.log("User Image ID:", userImage); // Checking the stored image ID

      // Send JSON response first
      let response = {
          active: true,
          user: req.session.user,
          userImage: null, // Will be filled with base64 image if available
          id: req.session.user.id
      };

      // Check if the userImage is already a base64 string
      const isBase64 = userImage && /^data:image\/[a-zA-Z]+;base64,/.test(userImage);

      if (userImage && !isBase64) {
          // If it's not base64, try to fetch the image from GridFS
          try {
              const base64Image = await streamImageFromGridfs(userImage); // Use the image ID
              response.user.userImage = base64Image; // Attach the base64 image
          } catch (error) {
              console.error("Error streaming image:", error);
              response.userImage = null; // Fallback in case of error
          }
      } else {
          // If the image is already base64, just send it as is
          response.user.userImage = userImage;
      }

      res.json(response);
  } else {
      // No session or user data
      return res.json({
          active: false,
          user: null,
          userImage: null,
      });
  }
};

module.exports = sessionStatus;
