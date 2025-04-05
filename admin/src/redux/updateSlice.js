import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./userSlice";

export const fetchSlice = createAsyncThunk(
  "update/updateSlices",
  async (params, { rejectWithValue }) => {
    try {
      const { path, param, data } = params;

      const result = await axios.put(
        `${process.env.REACT_APP_API_URL || ""}${path}/${param}/edit`,
        data,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      return {
        data: result.data,
        message: `${result.data.title || data.title || data.display_number} updated successfully`,
      };
    } catch (error) {
      rejectWithValue(error.response.data || "Failed to update");
    }
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const updateSlice = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlice.pending, (state) => {
        state.status = "loading";
        state.data = [];
      })
      .addCase(fetchSlice.fulfilled, (state, action) => {
        state.status = "successful";
        state.data = action.payload.data;
      })
      .addCase(fetchSlice.rejected, (state) => {
        state.status = "error";
        state.data = [];
      });
  },
});

export default updateSlice.reducer;
