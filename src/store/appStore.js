import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const applicationInitialState = {
    isAuthenticated: false,
    currentRoom: null,
    loading: true,
}

const applicationSlice = createSlice({
    name: 'application',
    initialState: applicationInitialState,
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        setCurrentRoom(state, action) {
            state.currentRoom = action.payload;
        },
        clearAuthentication(state){
            state.isAuthenticated = false;
        },
        setLoading(state, action){
            state.loading = action.payload;
        }
    }
});

export const applicationActions = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;