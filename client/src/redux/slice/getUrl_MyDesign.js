import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_myDesign_Order = createAsyncThunk(
  "fetchMyDesignOrder",
  async (params, thunkAPI) => {
    const { url, content } = params;
    try {
      const { data } = await axios.post(url, content, {
        withCredentials: true,
      });

      if (data.status === "error") {
        return thunkAPI.rejectWithValue(data);
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error("Error in fetchMyDesignOrder:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data_myDesign_order: [
    {
      img: "",
      name: "",
      phone: "",
      email: "",
      size: "",
      filling: "",
      comment: "",
    },
  ],
  status: "",
};

const getUrl_myDesign = createSlice({
  name: "requestToMail_myDesign",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "";
      state.data_myDesign_order = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch_myDesign_Order.pending, (state) => {
        state.status = "loading";
        state.data_myDesign_order = [];
      })
      .addCase(fetch_myDesign_Order.fulfilled, (state, action) => {
        state.status = action.payload.status || "successful";
        state.data_myDesign_order = action.payload;
        state.message = action.payload.message || "Your letter has been sent";
      })
      .addCase(fetch_myDesign_Order.rejected, (state, action) => {
        state.status = action.payload.status || "error";
        state.data_myDesign_order = action.payload;
        state.message =
          action.payload.message ||
          "Something went wrong. Please try again later";
      });
  },
});

export const { resetState } = getUrl_myDesign.actions;
export default getUrl_myDesign.reducer;
