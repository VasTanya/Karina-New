import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSearch = createAsyncThunk(
    'fetchSearch',
    async (params, thunkAPI) => {
        const { urlSearch } = params
        const { data } = await axios.get(urlSearch)
        console.log(typeof data);
         
        if(thunkAPI.length === 0 || typeof data === 'string' ){
            return thunkAPI.rejectWithValue('error')
        }
        return thunkAPI.fulfillWithValue(data)
    }
)

const initialState = {
    dataSearch: [],
    status: 'loading',
}

const getUrl_Search = createSlice({
    name: 'search',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearch.pending, (state) => {
                state.status = 'loading'
                state.dataSearch = []
            })
            .addCase(fetchSearch.fulfilled, (state, action) => {
                console.log(action.payload);
                state.status = 'successful'
                state.dataSearch = action.payload
            
            })
            .addCase(fetchSearch.rejected, (state) => {
                state.status = 'error'
                state.dataSearch = []
            })

    }
})


// export const {} = getUrlSlice.actions;
export default getUrl_Search.reducer;
