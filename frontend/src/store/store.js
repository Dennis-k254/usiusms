import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loadUser } from "../features/authSlice";
import scholarshipReducer, {
  getScholarships,
} from "../features/scholarshipSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schol: scholarshipReducer,
  },
});

store.dispatch(getScholarships());

store.dispatch(loadUser(null));
