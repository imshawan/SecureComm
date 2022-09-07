import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const applicationInitialState = {
    application: {
        isAuthenticated: false,
        currentRoom: null,
    }
}

const applicationSlice = createSlice({
    name: 'application',
    initialState: applicationInitialState,
    reducers: {
        isAuthenticated(state, action) {
            state.application.isAuthenticated = action.payload;
        },
        setCurrentRoom(state, action) {
            state.application.currentRoom = action.payload;
        },
    }
});

export const applicationActions = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;