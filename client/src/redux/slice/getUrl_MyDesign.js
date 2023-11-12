import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_myDesign_Order = createAsyncThunk(
  "fetch_myDesign_Order",
  async (params, thunkAPI) => {
    const { url, datainp } = params;
    // console.log("before url", url);
    // console.log("before data", datainp);

    try {
      const { data } = await axios.post(url, datainp, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

    //   console.log("after url", url);
    //   console.log("after data", datainp);
    //   console.log("after dataaa", data);

      if (thunkAPI.length === 0 || typeof data === "string") {
        return thunkAPI.rejectWithValue("error");
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      // Handle error here, e.g., logging or rejecting with a specific value
      console.error("Error in fetch_myDesign_Order:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data_myDesign_order: [
    {
      imgage: "",
      name: "",
      phone: "",
      email: "",
      size: "",
      filling: "",
      
    },
  ],
  status: "loading",
};

const getUrl_myDesign = createSlice({
  name: "requestToMail_myDesign",
  initialState,
  redusers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_myDesign_Order.pending, (state) => {
        state.status = "loading";
        state.data_myDesign_order = [];
      })

      .addCase(fetch_myDesign_Order.fulfilled, (state, action) => {
        state.status = "successful";
        state.data_myDesign_order = action.payload;
        // console.log(action.payload);
      })
      .addCase(fetch_myDesign_Order.rejected, (state) => {
        state.status = "error";
        state.data_myDesign_order = [];
      });
  },
});

// export const {} = getUrl.actions;
export default getUrl_myDesign.reducer;
