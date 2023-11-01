import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from "./Authentication/authenticationSlice";
import userProfileReducer from "./UserProfile/userProfileSlice";
import productsSlice from './Products/productsSlice';

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        userprofile: userProfileReducer,
        productsSlice,
    },
});

export default store;
