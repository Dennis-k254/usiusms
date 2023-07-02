import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loadUser } from "../features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

store.dispatch(loadUser(null));
