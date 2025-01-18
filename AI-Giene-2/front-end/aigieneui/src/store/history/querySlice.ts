import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Query {
    query: string;
    response: string;
}

interface querySliceState {
    value:Query[];
}

const initialState: querySliceState = {
    value: [],
};

const querySlice = createSlice({
    name:"query",
    initialState,
    reducers:{
        addQuery:(state,action: PayloadAction<Query[]>) => {
            state.value = action.payload;
        }
    }
})

export const { addQuery } = querySlice.actions;
export default querySlice.reducer;