import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from "./Authentication/authenticationSlice";
import userReducer from "./Users/usersSlice";
import userProfileReducer from "./UserProfile/userProfileSlice";

const store = configureStore({
    reducer: {
        authentication: authenticationReducer,
        users: userReducer,
        userprofile: userProfileReducer,
    },
});

export default store;
