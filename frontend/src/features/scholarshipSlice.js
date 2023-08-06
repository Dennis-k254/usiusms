import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  scholarships: JSON.parse(localStorage.getItem("scholarships")),
  userScholarships: JSON.parse(localStorage.getItem("userScholarships")),
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
      const response = await axios.post("http://localhost:8000/api/scholarship", {
        scholarshipName: values.scholarshipName,
        category: values.category,
        applicationDeadline: values.applicationDeadline,
      });
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
  async ({ userId, scholarshipId, status, applicationDeadline, category }, { dispatch }) => {
    try {
      // Fetch user's GPA from the server
      const userResponse = await axios.get(`http://localhost:8000/api/users/${userId}`);
      const userGPA = userResponse.data.gpa;
       console.log("I'm here")
      if (userGPA >= 3.0) {
        // User meets GPA requirement, apply scholarship
        const response = await axios.post(`http://localhost:8000/api/addScholarship/${userId}`, {
          userId,
          scholarshipId,
          status,
          applicationDeadline,
          category,
        });

        dispatch(toast.success("Scholarship successfully applied"));
        return response.data;

      } else {
        throw new Error("GPA requirement not met.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        dispatch(toast.error("Scholarship already applied"));
      } else if (error.message === "GPA requirement not met.") {
        dispatch(toast.error("Your GPA is below the required minimum (3.0) for applying to scholarships."));
      } else {
        dispatch(toast.error("Error applying scholarship", error.message));
      }
      throw error;
    }
  }
);

// Get specific user's approved and rejected scholarships
export const getUserScholarships = createAsyncThunk(
  "schol/getUserScholarships",
  async ({ userId }) => {
    try {
      console.log(userId);
      const response = await axios.get(`http://localhost:8000/api/addScholarship/${userId}`);
      console.log("schol", response.data);
      return response.data;
    } catch (error) {
      console.log("error fetching data");
      throw error;
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
      // Returning the scholarship object will trigger the `fulfilled` case in the `extraReducers` function
      return action.payload;
    });
    builder.addCase(addScholarshipToUser.rejected, (state, action) => {
      // Not needed, handled by the dispatch in the async thunk
    });
  },
});

export const { loadScholarships } = scholarshipSlice.actions;
export default scholarshipSlice.reducer;

