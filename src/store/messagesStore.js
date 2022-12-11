import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";
import { sortItemByTimestamp } from "../utils";

const messagesInitialState = {
    messageList: []
}

const messagesSlice = createSlice({
    name: 'messageList',
    initialState: messagesInitialState,
    reducers: {
        initmessages(state, action) {
            let {payload} = action;
            if (!Array.isArray(payload)) {
                payload = JSON.parse(JSON.stringify(payload));
            }
            state.messageList = sortItemByTimestamp(payload, 'createdAt');
        },
        addMessageToStore(state, action) {
            state.messageList.unshift(action.payload);
        },
        clearMessages(state) {
            state.messageList = [];
        },
    }
});

export const messageActions = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;