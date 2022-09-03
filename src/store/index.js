import { configureStore } from "@reduxjs/toolkit";
import { roomsReducer } from "./RoomListStore";

const Store = configureStore({
    reducer: {
        rooms: roomsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default Store;