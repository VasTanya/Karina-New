import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbums = createAsyncThunk(
    'cakes/fetchAllPhotoStatus',
    async (params) => {
        const { urlAlbums } = params
        const { data } = await axios.get(urlAlbums)
        return  data 

    }
)

const initialState = {
    dataAlbums: [],
    status: 'loading',
    pageCount : 1
}



const getUrlAlbums = createSlice({
    name: 'albums',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.status = 'loading'
                state.dataAlbums = []
            })

            .addCase(fetchAlbums.fulfilled, (state, action) => {
                state.status = 'successful'
                 state.dataAlbums = action.payload
             
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.status = 'error'
                 state.dataAlbums = []
             
            })

    }
})

// export const {} = getUrlSlice.actions;
export default getUrlAlbums.reducer;