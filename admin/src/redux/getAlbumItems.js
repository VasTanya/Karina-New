import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSlice = createAsyncThunk(
  "albumItems/fetchAlbumItems",
  async (params) => {
    const { param, page, size } = params;
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/albums/${param}?page=${page}&size=${size}&url=true&select=${encodeURIComponent(
        JSON.stringify(["sm"])
      )}`
    );
    return { data };
  }
);

const initialState = {
  data: [],
  status: "loading",
};

const getAlbumItems = createSlice({
  name: "albumItems",
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

export default getAlbumItems.reducer;
