// store/authenticationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: [],
    isAuthLoading: false,
    isAuthError: false,
    token: '',
    logoutMsg: '',
};

const authenticationSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        // Login 
        loginRequest(state) {
            state.user = [];
            state.isAuthLoading = true;
            state.isAuthError = false;
            state.token = '';
        },
        loginSuccess(state, action) {
            console.log({ action });
            localStorage.setItem("event_token", action?.payload?.token);
            state.user = action.payload;
            state.isAuthLoading = false;
            state.isAuthError = false;
            state.token = action?.payload?.token;
        },
        loginFailure(state, action) {
            console.log("login failure in reducer", action);
            state.user = [];
            state.isAuthLoading = false;
            state.isAuthError = true;
            state.token = '';
        },


        // Logout
        logoutRequest(state) {},
        logoutSuccess(state, action) {
            console.log("logout msg:", action?.payload?.message);
            localStorage.removeItem("event_token");
            state.token = false;
            state.logoutMsg = action?.message;
        },
        logoutFailure(state, action) {},
    },
});


export const {

    loginRequest,
    loginSuccess,
    loginFailure,

    logoutRequest,
    logoutSuccess,
    logoutFailure,

} = authenticationSlice.actions;


export default authenticationSlice.reducer;
