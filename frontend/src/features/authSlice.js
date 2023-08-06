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
        gpa: values.gpa,
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

export const updateGPA = createAsyncThunk(
  "auth/updateGPA",
  async (gpa, { getState, rejectWithValue }) => {
    try {
      const { token, _id } = getState().auth;
      const response = await axios.put(
        `http://localhost:8000/api/users/${_id}`,
        { gpa },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
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
      toast.success("Logout successfull");

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

  //Builder functions

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        toast.success("Account created successfully");
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
      toast.error(action.payload);
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        toast.success("Login successfull");
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
    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      toast.error(action.payload);
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(updateGPA.pending, (state, action) => {
      // Handle loading state if needed
    });

    builder.addCase(updateGPA.fulfilled, (state, action) => {
      // Update the state with the new GPA value if the API call is successful
      state.gpa = action.payload; // Use action.payload directly, as it contains the new GPA value
    });

    builder.addCase(updateGPA.rejected, (state, action) => {
      // Handle error state if needed
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
