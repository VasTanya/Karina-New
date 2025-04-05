import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./userSlice";

export const fetchSlice = createAsyncThunk(
  "delete/deleteSlices",
  async (params, { rejectWithValue }) => {
    try {
      const { path, param } = params;

      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL || ""}${path}/${param}/delete`,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );

      return { message: data.message };
    } catch (error) {
      rejectWithValue(error.response.data || "Failed to delete");
    }
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const deleteSlice = createSlice({
  name: "delete",
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

export default deleteSlice.reducer;
