import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./properties";

const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
