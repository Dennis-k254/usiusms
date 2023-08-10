import { configureStore } from "@reduxjs/toolkit";
import authReducer, { loadUser } from "../features/authSlice";
import scholarshipReducer, {
  getAllScholarships,
  getScholarships,
} from "../features/scholarshipSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    schol: scholarshipReducer,
  },
});

store.dispatch(getAllScholarships());

store.dispatch(loadUser(null));
