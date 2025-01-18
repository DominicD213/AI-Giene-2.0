import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchHistoryState{
    value: string,
}

const initialState: SearchHistoryState = {
    value: '',
};

const searchHistorySlice = createSlice({
    name:"SearchHistory",
    initialState,
    reducers:{
        setSearchHistory:(state,action: PayloadAction<string>) => {
         state.value = action.payload;
        }
    }
})

export const { setSearchHistory } = searchHistorySlice.actions;
export default searchHistorySlice.reducer;