import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const fetch_myDesign_Order = createAsyncThunk(
//   "fetch_myDesign_Order",
//   async (params, thunkAPI) => {
//     const { url, datainp } = params;

//     console.log('getUrl data',datainp);
//     try {
//       const { data } = await axios.post(url, datainp, {
//         withCredentials: true,
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//         body: datainp,
//       });

//       if (thunkAPI.length === 0 || typeof data === "string") {
//         return thunkAPI.rejectWithValue("error");
//       }
//        return thunkAPI.fulfillWithValue(data);

//     } catch (error) {
//       console.error("Error in fetch_myDesign_Order:", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
// }
// );

// export const fetch_myDesign_Order = createAsyncThunk(
//   "fetchMyDesignOrder",
//   async (params, thunkAPI) => {
//     const { url, datainp } = params;

//     console.log("getUrl data:", datainp);

//     try {
//       const { data } = await axios.post(url, datainp, {
//         withCredentials: true,
//         // body: datainp,
//       });

//       // if (thunkAPI.length === 0 || typeof data === "string") {
//       //   return thunkAPI.rejectWithValue("error");
//       // }
//       return thunkAPI.fulfillWithValue(data);
//     } catch (error) {
//       console.error("Error in fetchMyDesignOrder:", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const fetch_myDesign_Order = createAsyncThunk(
  "fetchMyDesignOrder",
  async (params, thunkAPI) => {
    const { url, datainp } = params;

    console.log("====================================");
    console.log("getUrl data:", datainp);
    console.log("====================================");

    try {
      const { data } = await axios.post(url, datainp, {
        withCredentials: true,
      });
      console.log("====================================");
      console.log(":DATA: ", data);
      console.log("====================================");
      // if (thunkAPI.length === 0 || typeof data === "string") {
      //   return thunkAPI.rejectWithValue("error");
      // }
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
      })
      .addCase(fetch_myDesign_Order.rejected, (state) => {
        state.status = "error";
        state.data_myDesign_order = [];
      });
  },
});

// export const {} = getUrl.actions;
export default getUrl_myDesign.reducer;
