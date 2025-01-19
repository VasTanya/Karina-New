import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFirstFoto = createAsyncThunk(
  "cakes/fetchFirstFotoStatus",
  async (params, thunkAPI) => {
    const { urlFirstFoto } = params;
    const { data } = await axios.get(urlFirstFoto);
    if (data.length === 0 || typeof data === "string") {
      return thunkAPI.rejectWithValue("No data");
    }
    return thunkAPI.fulfillWithValue(data);
  }
);

const initialState = {
  dataFirstFoto: [],
  status: "loading",
};

const getUrlFirstFoto = createSlice({
  name: "firstFoto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFirstFoto.pending, (state) => {
        state.status = "loading";
        state.dataFirstFoto = [];
      })

      .addCase(fetchFirstFoto.fulfilled, (state, action) => {
        state.status = "successful";
        state.dataFirstFoto = action.payload;
      })
      .addCase(fetchFirstFoto.rejected, (state) => {
        state.status = "error";
        state.dataFirstFoto = [];
      });
  },
});

// export const {} = getUrlSlice.actions;
export default getUrlFirstFoto.reducer;
