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
      console.log("====================================");
      console.log(":DATA: ", data);
      console.log("====================================");
      if (thunkAPI.length === 0 || typeof data === "string") {
        return thunkAPI.rejectWithValue("error");
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      // Handle error here, e.g., logging or rejecting with a specific value
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
      img: "",
      cakeCode: "",
    },
  ],
  status1: "loading",
};

const getUrl_Request = createSlice({
  name: "requestToMail",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_Request.pending, (state) => {
        state.status1 = "loading";
        state.data_request = [];
      })

      .addCase(fetch_Request.fulfilled, (state, action) => {
        state.status1 = "successful";
        state.data_request = action.payload;
      })
      .addCase(fetch_Request.rejected, (state) => {
        state.status1 = "error";
        state.data_request = [];
      });
  },
});

// export const {} = getUrl.actions;
export default getUrl_Request.reducer;
