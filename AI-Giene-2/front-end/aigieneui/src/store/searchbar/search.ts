import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchSlice{
   search: string,
   loading: boolean,
}

const initialState: searchSlice = {
   search: '',
   loading: false,
};

const searchSlice = createSlice({
    name: "Search",
    initialState,
    reducers: {
        updateSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
    },
})

export const { updateSearch, startLoading, stopLoading } = searchSlice.actions;
export default searchSlice.reducer;