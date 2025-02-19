import { setUserImage } from "../../../store/Authentication/userImage";
import { setImagePreview } from "../../../store/Authentication/userImagePreview";
import useHandleImageUpload from "../handleImageUpload/imageUpload";
import { useDispatch } from "react-redux";

const useHandleImageChanges = () => {
  const dispatch = useDispatch();
  const handleImageUpload = useHandleImageUpload();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log('File selected:', file); // Log the selected file
      const fileObjectURL = URL.createObjectURL(file); // Create a URL for the preview image

      console.log('Object URL created for preview:', fileObjectURL); // Log the object URL

      // Dispatching the image to Redux for preview and user image
      console.log('Dispatching setUserImage with fileObjectURL:', fileObjectURL);
      dispatch(setUserImage(fileObjectURL)); // Set the image in Redux
      console.log('Dispatching setImagePreview with fileObjectURL:', fileObjectURL);
      dispatch(setImagePreview(fileObjectURL)); // Set the image preview in Redux

      // Automatically upload the image
      console.log('Starting image upload...');
      try {
        const uploadResponse = await handleImageUpload(file);
        console.log('Upload response:', uploadResponse); // Log the response from image upload API
        console.log('Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        console.log('Cleaning up object URL after 5 seconds...');
        setTimeout(() => {
          URL.revokeObjectURL(fileObjectURL); // Clean up the object URL after 5 seconds
          console.log('Object URL revoked');
        }, 5000);
      }
    } else {
      console.error('No file selected');
    }
  };

  return handleImageChange; // Return the function to be used in the component
};

export default useHandleImageChanges;
