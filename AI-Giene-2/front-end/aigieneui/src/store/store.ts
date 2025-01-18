import {configureStore } from '@reduxjs/toolkit';
import searchHistoryReducer from './history/searchHistorySlice';
import queryReducer from './history/querySlice';
import loginUserSlice from './Authentication/loginCredentials';
import loginStateReducer from './Authentication/loginState';
import singUpStateReducer from './Authentication/singUpState';
import signUpCredentialSlice from './Authentication/singUpCredentails';
import userImageSlice from './Authentication/userImage';
import searhSlice from './searchbar/search';
import sessionStatusSlice from './session/sessionStatus';

export const store = configureStore({
    reducer: {
        searchHistory: searchHistoryReducer,
        query: queryReducer,
        login: loginUserSlice,
        loginState : loginStateReducer,
        signUpState: singUpStateReducer,
        signUpCredentials: signUpCredentialSlice,
        userImage: userImageSlice, 
        search: searhSlice,
        session: sessionStatusSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;