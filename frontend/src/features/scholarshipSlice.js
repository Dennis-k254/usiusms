import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  scholarships: JSON.parse(localStorage.getItem("scholarships")),
  userScholarships: JSON.parse(localStorage.getItem("userScholarships")),
  applicationStatus: "",
  error: "",
};

// Fetching all scholarships
export const getScholarships = createAsyncThunk(
  "schol/getScholarships",
  async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/scholarship");
      return response.data;
    } catch (error) {
      console.log("error fetching data");
      throw error;
    }
  }
);

// Creating a new scholarship by admin
export const createScholarship = createAsyncThunk(
  "schol/createScholarship",
  async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/scholarship",
        {
          scholarshipName: values.scholarshipName,
          category: values.category,
          applicationDeadline: values.applicationDeadline,
        }
      );
      return response.data;
    } catch (error) {
      toast.error("error adding scholarship to user", error);
      throw error;
    }
  }
);

// Add specific user's scholarships application to user's scholarship array
export const addScholarshipToUser = createAsyncThunk(
  "schol/addScholarshipToUser",
  async (
    { userId, scholarshipId, status, applicationDeadline, category },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/addScholarship/${userId}`,
        {
          userId,
          scholarshipId,
          status,
          applicationDeadline,
          category,
        }
      );

      toast.success("Scholarship successfully applied");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Get specific user's approved and rejected scholarships
export const getUserScholarships = createAsyncThunk(
  "schol/getUserScholarships",
  async ({ userId }) => {
    try {
      console.log(userId);
      const response = await axios.get(
        `http://localhost:8000/api/addScholarship/${userId}`
      );
      console.log("schol", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGpa = createAsyncThunk(
  "schol/updateGpa",
  async ({ userId, gpa }) => {
    try {
      console.log(userId);
      const response = await axios.post(
        `http://localhost:8000/api/addScholarship/updateGpa/${userId}`,
        {
          gpa,
        }
      );
      console.log("gpa", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const scholarshipSlice = createSlice({
  name: "schol",
  initialState,
  reducers: {
    loadScholarships(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getScholarships.fulfilled, (state, action) => {
      state.scholarships = action.payload;
      console.log("payload", action.payload);
      localStorage.setItem("scholarships", JSON.stringify(action.payload));
    });
    builder.addCase(getScholarships.pending, (state, action) => {
      console.log("pending");
    });
    builder.addCase(getScholarships.rejected, (state, action) => {
      console.log("error");
    });
    builder.addCase(getUserScholarships.fulfilled, (state, action) => {
      state.userScholarships = action.payload;
      localStorage.setItem("userScholarships", JSON.stringify(action.payload));
    });
    builder.addCase(createScholarship.fulfilled, (state, action) => {
      // Returning the scholarship object will trigger the `fulfilled` case in the `extraReducers` function
      return action.payload;
    });
    builder.addCase(addScholarshipToUser.fulfilled, (state, action) => {
      return { ...state, applicationStatus: "success" };
    });
    builder.addCase(addScholarshipToUser.rejected, (state, action) => {
      return {
        ...state,
        applicationStatus: "rejected",
        error: action.payload.error,
      };
    });
    builder.addCase(addScholarshipToUser.pending, (state, action) => {
      return { ...state, applicationStatus: "pending" };
    });
  },
});

export const { loadScholarships } = scholarshipSlice.actions;
export default scholarshipSlice.reducer;
