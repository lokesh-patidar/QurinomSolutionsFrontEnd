// store/userProfileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: [],
    isUserProfileLoading: false,
    isUserProfileError: false,
    userProfileErrorMsg: '',
};

const userProfileSlice = createSlice({
    name: 'userprofile',
    initialState,
    reducers: {
        getUserProfileRequest(state) {
            state.isUserProfileLoading = true;
            state.isUserProfileError = false;
            state.userProfileErrorMsg = '';
        },
        getUserProfileSuccess(state, action) {
            state.user = action.payload ? action.payload : [];
            state.isUserProfileLoading = false;
            state.isUserProfileError = false;
            state.userProfileErrorMsg = '';
        },
        getUserProfileFailure(state, action) {
            state.user = [];
            state.isUserProfileLoading = false;
            state.isUserProfileError = true;
            state.userProfileErrorMsg = '';
        },
    },
});

export const {
    getUserProfileRequest,
    getUserProfileSuccess,
    getUserProfileFailure,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;

