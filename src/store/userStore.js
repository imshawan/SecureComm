import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const currentUserInitialState = {
    currentUser: {
        location: {}
    }
}

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: currentUserInitialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        updateProfilePicture(state, action) {
            state.currentUser = {...state.currentUser, picture: action.payload};
        },
        updateUserData(state, action) {
            state.currentUser = {...state.currentUser, ...action.payload};
        },
        updateLocation(state, action) {
            state.currentUser = {...state.currentUser, location: action.payload};
        },
    }
});

export const currentUserActions = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;