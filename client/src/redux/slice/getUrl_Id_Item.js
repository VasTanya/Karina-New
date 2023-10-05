import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_Id_Albums_Item = createAsyncThunk(
    'fetch_Id_AlbumsStatus_Item',
    async (params, thunkAPI) => {
        const { url_Id_Albums_Item } = params
        const { data } = await axios.get(url_Id_Albums_Item)
        // console.log(data);
        if(thunkAPI.length === 0 || typeof data === 'string' ){
            return thunkAPI.rejectWithValue('error')
        }
        return thunkAPI.fulfillWithValue(data)

    }
)

const initialState = {
    data_Id_Albums_Item: [],
    status: 'loading',
}



const getUrl_Id_Item = createSlice({
    name: 'albums_Id_Item',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetch_Id_Albums_Item.pending, (state) => {
                state.status = 'loading'
                state.data_Id_Albums_Item = []
            })

            .addCase(fetch_Id_Albums_Item.fulfilled, (state, action) => {
                state.status = 'successful'
                 state.data_Id_Albums_Item = action.payload
             
            })
            .addCase(fetch_Id_Albums_Item.rejected, (state) => {
                state.status = 'error'
                 state.data_Id_Albums_Item = []
             
            })

    }
})

// export const {} = getUrl.actions;
export default getUrl_Id_Item.reducer;