import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface sessionStatusSlice {
    queries: string[],
    error:null | string,
    sessionLoading: boolean,
}

const initialState: sessionStatusSlice = {
    queries: [],
    error: null,
    sessionLoading: false,
};

const sessionStatusSlice = createSlice({
    name: "SessionStatus",
    initialState,
    reducers: {
        addRequest: (state, action: PayloadAction<string>) => {
            state.queries.push(action.payload);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        startLoading: (state) => {
            state.sessionLoading = true;
        },
        stopLoading: (state) => {
            state.sessionLoading = false;
        },
    },
});

export const { addRequest, setError, startLoading, stopLoading } = sessionStatusSlice.actions;
export default sessionStatusSlice.reducer;