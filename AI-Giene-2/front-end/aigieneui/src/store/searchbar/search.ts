import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface search{
   search: string,
   loading: boolean,
}

const initialState: search = {
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