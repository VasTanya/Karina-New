import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "./userSlice";

export const fetchSlice = createAsyncThunk(
  "create/createSlices",
  async (params, { rejectWithValue }) => {
    try {
      const { path, data } = params;
      const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/${path}/add`,
        data,
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      return (
        result.data || {
          message: `${result.data.title || data.title || data.display_number} added successfully`,
        }
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add product");
    }
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const addProductSlice = createSlice({
  name: "create",
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

export default addProductSlice.reducer;
