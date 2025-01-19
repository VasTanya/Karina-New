import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSlice = createAsyncThunk(
  "cakes/fetchSliceStatus",
  async (params) => {
    const { urlSlices } = params;
    const { data } = await axios.get(urlSlices);
    return { data };
  }
);

const initialState = {
  dataSlices: [],
  status: "loading",
};

const getUrlSlice = createSlice({
  name: "slices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlice.pending, (state) => {
        state.status = "loading";
        state.dataSlices = [];
      })
      .addCase(fetchSlice.fulfilled, (state, action) => {
        state.status = "successful";
        state.dataSlices = action.payload;
      })
      .addCase(fetchSlice.rejected, (state) => {
        state.status = "error";
        state.dataSlices = [];
      });
  },
});

// export const {} = getUrlSlice.actions;
export default getUrlSlice.reducer;
