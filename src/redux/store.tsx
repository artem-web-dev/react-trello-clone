import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
});

export default store;