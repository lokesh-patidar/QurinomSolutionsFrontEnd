// store/usersSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allUsers: [],
    isUsersLoading: false,
    isUsersError: false,
    usersErrorMsg: '',
    addedUser: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Get All Users:-
        getUserRequest(state) {
            state.isUsersLoading = true;
            state.isUsersError = false;
        },
        getUserSuccess(state, action) {
            state.allUsers = action.payload ? action.payload : [];
            state.isUsersLoading = false;
            state.isUsersError = false;
        },
        getUserFailure(state, action) {
            state.allUsers = [];
            state.isUsersLoading = false;
            state.isUsersError = true;
        },

        // Add New use:- 
        addUserRequest(state) { },
        addUserSuccess(state, action) {
            state.allUsers = [...state.allUsers, action?.payload];
        },
        addUserFailure(state, action) { },

        // Change Users Role:-
        changeRoleRequest(state) { },
        changeRoleSuccess(state, action) {
            const id = action?.payload?._id;
            console.log(id);
            const filteredUsers = [...state.allUsers.filter((el) => el._id !== id)];
            console.log(filteredUsers);
            state.allUsers = [...filteredUsers, action?.payload];
        },
        changeRoleFailure(state, action) { },
    },
});


export const {

    getUserRequest,
    getUserSuccess,
    getUserFailure,

    addUserRequest,
    addUserSuccess,
    addUserFailure,

    changeRoleRequest,
    changeRoleSuccess,
    changeRoleFailure,

} = usersSlice.actions;

export default usersSlice.reducer;
