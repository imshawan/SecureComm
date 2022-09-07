import { configureStore } from "@reduxjs/toolkit";
import { roomsReducer } from "./roomListStore";
import { currentUserReducer } from "./userStore";
import { messagesReducer } from "./messagesStore";
import { applicationReducer } from "./appStore";

const Store = configureStore({
    reducer: {
        rooms: roomsReducer,
        user: currentUserReducer,
        messages: messagesReducer,
        application: applicationReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default Store;