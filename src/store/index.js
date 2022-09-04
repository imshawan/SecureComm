import { configureStore } from "@reduxjs/toolkit";
import { roomsReducer } from "./roomListStore";
import { currentUserReducer } from "./userStore";

const Store = configureStore({
    reducer: {
        rooms: roomsReducer,
        user: currentUserReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default Store;