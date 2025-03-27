import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSlice = createAsyncThunk(
  "basics/fetchBasics",
  async (params) => {
    const { param } = params;
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/basics/${param}`
    );
    return { data };
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const getBasics = createSlice({
  name: "basics",
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

export default getBasics.reducer;
