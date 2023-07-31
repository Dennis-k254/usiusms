import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  isAdmin: false,
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`http://localhost:8000/api/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`http://localhost:8000/api/login`, {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      toast.error(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,

          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      localStorage.removeItem("userSchorlaship");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        isAdmin: false,
        balance: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,

          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          isAdmin: user.isAdmin,
          balance: user.balance,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
