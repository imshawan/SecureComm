import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const roomsInitialState = {
    roomList: []
}

const roomsSlice = createSlice({
    name: 'roomList',
    initialState: roomsInitialState,
    reducers: {
        initRooms(state, action) {
            state.roomList = action.payload;
        },
        addRoomToStore(state, action) {

            let found = (state.roomList || []).find(item => item._id == action.payload._id);
            if (!found) {
                state.roomList = [...state.roomList, {
                    ...action.payload
                }]
            } else {
                state.roomList = state.roomList;
            }
        },
        clearRooms(state) {
            state.roomList = [];
        },
    }
});

export const roomActions = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;