// store/userProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isUserProfileLoading: false,
    isUserProfileError: false,
};

const userProfileSlice = createSlice({
    name: 'userprofile',
    initialState,
    reducers: {
        getUserProfileRequest(state) {
            state.isUserProfileLoading = true;
            state.isUserProfileError = false;
        },
        getUserProfileSuccess(state, action) {
            state.user = action.payload ? action.payload : {};
            state.isUserProfileLoading = false;
            state.isUserProfileError = false;
        },
        getUserProfileFailure(state, action) {
            state.user = {};
            state.isUserProfileLoading = false;
            state.isUserProfileError = true;
        },
    },
});

export const {
    getUserProfileRequest,
    getUserProfileSuccess,
    getUserProfileFailure,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;

