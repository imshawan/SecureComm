import { createSlice } from "@reduxjs/toolkit";
import { log } from "../config";

const roomsInitialState = {
    roomList: [],
    recentRooms: [],
    currentRoom: {},
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
                state.roomList = [{...action.payload}, ...state.roomList]
            } else {
                state.roomList = state.roomList;
            }
        },
        clearRooms(state) {
            state.roomList = [];
        },
        addToRecent(state, action) {
            if (state.recentRooms.length > 6) {
                state.recentRooms.length = 5;
            }
            state.recentRooms = [...new Set([...state.recentRooms, {...action.payload.currentRoom}])];
        },
        updateLatestMessage(state, action) {
            let {message, _id} = action.payload;
            let roomList = state.roomList || [];

            let objIndex = roomList.findIndex(obj => obj._id == _id);

            if (objIndex != -1) {
                roomList[objIndex].latestMessage = message;
                state.roomList = roomList;
            }
        },
        setCurrentRoom(state, action) {
            state.currentRoom = action.payload;
        }
    }
});

export const roomActions = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;