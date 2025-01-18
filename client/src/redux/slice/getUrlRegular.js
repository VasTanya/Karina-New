import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRegular = createAsyncThunk(
  "cakes/fetchRegularStatus",
  async (params) => {
    const { urlRegular } = params;
    const { data } = await axios.get(urlRegular);
    return { data };
  }
);

const initialState = {
  dataRegular: [],
  status: "loading",
};

const getUrlRegular = createSlice({
  name: "regular",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegular.pending, (state) => {
        state.status = "loading";
        state.dataRegular = [];
      })

      .addCase(fetchRegular.fulfilled, (state, action) => {
        state.status = "successful";
        state.dataRegular = action.payload;
      })
      .addCase(fetchRegular.rejected, (state) => {
        state.status = "error";
        state.dataRegular = [];
      });
  },
});

// export const {} = getUrlSlice.actions;
export default getUrlRegular.reducer;
