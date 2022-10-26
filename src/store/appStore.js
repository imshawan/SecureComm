import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const applicationInitialState = {
    isAuthenticated: false,
    loading: true,
    authToken: null,
    initializingRooms: true,
}

const applicationSlice = createSlice({
    name: 'application',
    initialState: applicationInitialState,
    reducers: {
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        clearAuthentication(state){
            state.isAuthenticated = false;
        },
        setLoading(state, action){
            state.loading = action.payload;
        },
        setAuthToken(state, action){
            state.authToken = action.payload;
        },
        setinitializingRooms(state, action){
            state.initializingRooms = action.payload;
        },
    }
});

export const applicationActions = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;