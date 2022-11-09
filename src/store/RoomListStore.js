import { createSlice } from "@reduxjs/toolkit";
import { sortItemByTimestamp } from "../utils";
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
            state.roomList = sortItemByTimestamp(action.payload, 'lastActive');
        },
        addRoomToStore(state, action) {

            let found = (state.roomList || []).find(item => item._id == action.payload._id);
            if (!found) {
                state.roomList = sortItemByTimestamp([{...action.payload}, ...state.roomList], 'lastActive')
            } else {
                state.roomList = sortItemByTimestamp(state.roomList, 'lastActive');
            }
        },
        clearRooms(state) {
            state.roomList = [];
        },
        addToRecent(state, action) {
            if (state.recentRooms.length > 6) {
                state.recentRooms.length = 5;
            }
            state.recentRooms = sortItemByTimestamp([...new Set([...state.recentRooms, {...action.payload.currentRoom}])], 'lastActive');
        },
        updateLatestMessage(state, action) {
            let {message, _id, lastActive, memberDetails} = action.payload;
            let roomList = state.roomList || [];

            let objIndex = roomList.findIndex(obj => obj._id == _id);

            if (objIndex != -1) {
                roomList[objIndex].latestMessage = message;
                roomList[objIndex].lastActive = lastActive;
                roomList[objIndex].memberDetails = memberDetails;

                state.roomList = sortItemByTimestamp(roomList, 'lastActive');
            }
        },
        setCurrentRoom(state, action) {
            state.currentRoom = action.payload;
        }
    }
});

export const roomActions = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;