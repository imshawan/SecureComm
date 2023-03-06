import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const applicationInitialState = {
    isAuthenticated: false,
    loading: true,
    authToken: null,
    initializingRooms: true,
    deviceId: null,
    isConnectionError: null,
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
        setDeviceId(state, action) {
            state.deviceId = action.payload;
        },
        setConnectionStatus(state, action) {
            state.isConnectionError = action.payload;
        }
    }
});

export const applicationActions = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;