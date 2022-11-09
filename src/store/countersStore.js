import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const countersInitialState = {
    unreadMessagesCount: []
}

const countersSlice = createSlice({
    name: 'counters',
    initialState: countersInitialState,
    reducers: {
        clearUnreadMessageCount(state, action) {
            let id = action.payload;
            let unreadMessagesCount = state.unreadMessagesCount || [];

            let objIndex = unreadMessagesCount.findIndex(obj => obj && Object.keys(obj)[0] == id);

            if (objIndex != -1) {
                state.unreadMessagesCount[objIndex][id] = null;
            }
        },
        incrementUnreadCount(state, action) {
            let id = action.payload;
            let unreadMessagesCount = state.unreadMessagesCount || [];

            let objIndex = unreadMessagesCount.findIndex(obj => obj && Object.keys(obj)[0] == id);

            if (objIndex != -1) {
                state.unreadMessagesCount[objIndex][id] = unreadMessagesCount[objIndex][id] += 1;
            } else {
                state.unreadMessagesCount = [{[id]: 1}, ...state.unreadMessagesCount];
            }
        }
    }
});

export const counterActions = countersSlice.actions;
export const countersReducer = countersSlice.reducer;