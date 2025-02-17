import { createSlice} from "@reduxjs/toolkit";

interface singUp {
    value: boolean
}

const initialState: singUp = {
    value: false,
};

const singUpSlice = createSlice({
    name: "SingUp",
    initialState,
    reducers: {
        toggleSignUp: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggleSignUp } = singUpSlice.actions;
export default singUpSlice.reducer;