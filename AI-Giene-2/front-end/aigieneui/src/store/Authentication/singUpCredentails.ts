import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface signUpCredentialSlice {
    email: string;
    password: string;
    username: string;
}

const initialState: signUpCredentialSlice = {
    email: '',
    password: '',
    username: '',
};

const signUpCredentialSlice = createSlice({
    name: 'credentials',
    initialState,
    reducers: {
        updateEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        updatePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        updateUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
    },
});

export const { updateEmail, updatePassword, updateUsername } = signUpCredentialSlice.actions;
export default signUpCredentialSlice.reducer;