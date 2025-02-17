import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface error{
    value: string;
}

const initialState: error = {
    value: '',
};

const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;