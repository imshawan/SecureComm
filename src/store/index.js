import { configureStore } from "@reduxjs/toolkit";
import { roomsReducer } from "./roomListStore";
import { currentUserReducer } from "./userStore";
import { messagesReducer } from "./messagesStore";
import { applicationReducer } from "./appStore";
import { countersReducer } from "./countersStore";
import { settingsReducer } from "./settingsStore";

const Store = configureStore({
    reducer: {
        rooms: roomsReducer,
        user: currentUserReducer,
        messages: messagesReducer,
        application: applicationReducer,
        counters: countersReducer,
        settings: settingsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
});

export default Store;