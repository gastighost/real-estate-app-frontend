import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties";
import usersReducer from "./users";

const store = configureStore({
  reducer: {
    properties: propertiesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
