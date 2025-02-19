import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { setImagePreview } from '../../../store/Authentication/userImagePreview';
import imageUploadAPI from "../../../services/imageHandling/imageUploadAPI";

const useHandleImageUpload = () => {

    const sessionActive = useSelector((state: RootState) => state.login.sessionActive);
    const dispatch = useDispatch();

    const handleImageUpload = async (file: File | null) => {
        if (!sessionActive) {
            console.error('User is not logged in');
            return;
        }

        if (!file) {
            console.error('No image selected');
            return;
        }

        // File validation
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            console.error('Invalid file type');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB size limit
            console.error('File size exceeds the limit');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        // Log FormData content for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const response = await imageUploadAPI(formData);

            if (response.status === 201) {
                console.log('Image uploaded successfully');
                const previewImage = URL.createObjectURL(file);
                dispatch(setImagePreview(previewImage));

                setTimeout(() => {
                    URL.revokeObjectURL(previewImage);  // Clean up preview URL
                }, 5000);
            } else {
                console.error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return handleImageUpload;
};

export default useHandleImageUpload;
