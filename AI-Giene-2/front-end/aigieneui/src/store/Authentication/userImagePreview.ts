import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IconPerson from '../../Assets/personPlaceHolder.png'

interface userImagePreview{
    imagePreview: string | null;
}

const initialState: userImagePreview = {
    imagePreview: IconPerson,
};

const userImagePreviewSlice = createSlice({
    name: 'userImagePreview',
    initialState,
    reducers: {
        setImagePreview: (state, action: PayloadAction<string>) => {
            state.imagePreview = action.payload;
        },
    },
});

export const { setImagePreview } = userImagePreviewSlice.actions;
export default userImagePreviewSlice.reducer;