import { createSlice } from '@reduxjs/toolkit';

interface loginButton{
    loading: boolean;
}

const initialState: loginButton = {
    loading: false,
};

const loginButtonSlice = createSlice({
    name: 'loginButton',
    initialState,
    reducers: {
        setLoading: (state) => {
            state.loading =!state.loading;
        },
    },
});

export const { setLoading } = loginButtonSlice.actions;
export default loginButtonSlice.reducer;