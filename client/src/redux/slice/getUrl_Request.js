import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_Request = createAsyncThunk(
  "fetch_request",
  async (params, thunkAPI) => {
    const { url, datainp } = params;

    try {
      const { data } = await axios.post(url, datainp, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.status === "error") {
        return thunkAPI.rejectWithValue(data);
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      console.error("Error in fetch_Request:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data_request: [
    {
      name: "",
      phone: "",
      email: "",
      size: "",
      filling: "",
      pick_up_date: "",
      comment: "",
      img: "",
      cakeCode: "",
    },
  ],
  status: "",
};

const getUrl_Request = createSlice({
  name: "requestToMail",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = "";
      state.data_request = [];
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch_Request.pending, (state) => {
        state.status = "loading";
        state.data_request = [];
      })

      .addCase(fetch_Request.fulfilled, (state, action) => {
        state.status = action.payload.status || "successful";
        state.data_request = action.payload;
        state.message = action.payload.message || "Your letter has been sent";
      })
      .addCase(fetch_Request.rejected, (state, action) => {
        state.status = action.payload.status || "error";
        state.data_request = [];
        state.message =
          action.payload.message ||
          "Something went wrong. Please try again later";
      });
  },
});

export const { resetState } = getUrl_Request.actions;
export default getUrl_Request.reducer;
