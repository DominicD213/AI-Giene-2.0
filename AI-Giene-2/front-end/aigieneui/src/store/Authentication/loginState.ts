import { createSlice } from "@reduxjs/toolkit";

interface loginSlice {
    value: boolean
}

const initialState: loginSlice = {
    value: false,
};

const loginSlice = createSlice({
    name: "Login",
    initialState,
    reducers: {
        toggleLogin: (state) => {
            state.value = !state.value;
        },
    },
});


export const { toggleLogin } = loginSlice.actions;
export default loginSlice.reducer;