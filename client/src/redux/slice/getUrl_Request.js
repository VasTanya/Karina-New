import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_Request = createAsyncThunk(
    'fetch_request',
    async (params, thunkAPI) => {
        const { url, datainp } = params
        const { data } = await axios({
            method: 'post',
            url: url,
            data:  datainp
        })

        // console.log('data',data);
        if(thunkAPI.length === 0 || typeof data === 'string' ){
            return thunkAPI.rejectWithValue('error')
        }
        return thunkAPI.fulfillWithValue(data)

    }
)

const initialState = {
    data_request: [
         {
            name: "",
            phone: "",
            email: "",
            size: "",
            filling: "",
            cakeCode: "",
          },
    ],
    status1: 'loading',
}

const getUrl_Request = createSlice({
    name: 'albums_Id_Item',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetch_Request.pending, (state) => {
                state.status1 = 'loading'
                state.data_request = []
            })

            .addCase(fetch_Request.fulfilled, (state, action) => {
                state.status1 = 'successful'
                 state.data_request = action.payload
             
            })
            .addCase(fetch_Request.rejected, (state) => {
                state.status1 = 'error'
                 state.data_request = []
             
            })

    }
})

// export const {} = getUrl.actions;
export default getUrl_Request.reducer;