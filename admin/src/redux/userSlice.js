import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getToken = () =>
  document.cookie
    .split("; ")
    .find((x) => x.includes("token"))
    ?.split("=")[1];

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, { rejectWithValue }) => {
    const token = getToken();
    return token
      ? { authenticated: true }
      : rejectWithValue("Not authenticated");
  }
);

export const fetchSlice = createAsyncThunk(
  "user/fetchUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        userCredentials
      );
      if (data.token)
        document.cookie = `token=${data.token}; path=/; max-age=3600`;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Login failed");
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "idle";
      document.cookie = "token=; path=/; max-age=0";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSlice.fulfilled, (state, action) => {
        state.status = "successful";
        state.data = action.payload;
      })
      .addCase(fetchSlice.rejected, (state, action) => {
        state.status = "error";
        state.data = action.payload;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "successful";
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "idle";
        state.data = null;
      });
  },
});

export const { logout } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
