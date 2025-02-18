import {createSlice } from '@reduxjs/toolkit';

interface loginUser {
    user: string;
    loginPassword: string;
    sessionActive: boolean;
    id: string;
}

const initialState: loginUser = {
    user: "",
    loginPassword: '',
    sessionActive: false,
    id: '',
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
        setId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setUser,setLoginPassword, setSessionActive,setId } = loginUserSlice.actions;
export default loginUserSlice.reducer;
