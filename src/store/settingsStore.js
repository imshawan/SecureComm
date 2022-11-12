import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const settingsInitialState = {
    notifications: {
        vibrate: false,
        tune: true,
      }
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: settingsInitialState,
    reducers: {
        setNotificationData(state, action) {
            state.notifications = {...state.notifications, ...action.payload};
        },
    }
});

export const settingsActions = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;