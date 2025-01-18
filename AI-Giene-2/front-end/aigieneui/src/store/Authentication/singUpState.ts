import { createSlice} from "@reduxjs/toolkit";

interface singUpSlice {
    value: boolean
}

const initialState: singUpSlice = {
    value: false,
};

const singUpSlice = createSlice({
    name: "SingUp",
    initialState,
    reducers: {
        toggleSingUp: (state) => {
            state.value = !state.value;
        },
    },
});

export const { toggleSingUp } = singUpSlice.actions;
export default singUpSlice.reducer;