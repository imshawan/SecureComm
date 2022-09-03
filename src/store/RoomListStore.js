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
           state.roomList = [...state.roomList, {...action.payload}]
        },
    }
});

export const roomActions = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;