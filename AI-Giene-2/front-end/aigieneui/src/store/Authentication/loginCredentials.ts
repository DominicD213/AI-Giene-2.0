import {createSlice } from '@reduxjs/toolkit';

interface loginUser {
    user: string;
    loginPassword: string;
    sessionActive: boolean;
}

const initialState: loginUser = {
    user: "",
    loginPassword: '',
    sessionActive: false,
};

const loginUserSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setSessionActive: (state, action) => {
            state.sessionActive = action.payload;
            },
        setLoginPassword: (state, action) => {
            state.loginPassword = action.payload;
        },
    },
});

export const { setUser,setLoginPassword, setSessionActive } = loginUserSlice.actions;
export default loginUserSlice.reducer;
