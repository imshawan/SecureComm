import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const messagesInitialState = {
    messageList: []
}

const messagesSlice = createSlice({
    name: 'messageList',
    initialState: messagesInitialState,
    reducers: {
        initmessages(state, action) {
            state.messageList = action.payload;
        },
        addMessageToStore(state, action) {
            state.messageList = [{...action.payload}, ...state.messageList];
        },
        clearMessages(state) {
            state.messageList = [];
        },
    }
});

export const messageActions = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;