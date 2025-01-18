import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userImage {
    userImageState: boolean;
    userImage: string;
}

const initialState: userImage = {
    userImageState: false,
    userImage: '',
};

const userImageSlice = createSlice({
    name: 'userImage',
    initialState,
    reducers: {
        toggleUserImage: (state) => {
            state.userImageState =!state.userImageState;
        },
        setUserImage: (state, action: PayloadAction<string>) => {
            state.userImage = action.payload;
        },
    },
});

export const { toggleUserImage, setUserImage } = userImageSlice.actions;
export default userImageSlice.reducer;
