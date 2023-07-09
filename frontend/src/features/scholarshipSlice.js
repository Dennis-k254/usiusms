import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  scholarships: JSON.parse(localStorage.getItem("scholarships")),
};

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

export const createScholarship = createAsyncThunk(
  "schol/createScholarship",
  async (values) => {
    try {
      const scholarship = await axios.post(
        `http://localhost:8000/api/register`,
        {
          scholarshipName: values.scholarshipName,
          category: values.category,
          applicationDeadline: values.applicationDeadline,
        }
      );
      console.log(scholarship);
      return response.data;
    } catch (error) {
      console.log("error creating scholarship");
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
  },
});

export default scholarshipSlice.reducer;
