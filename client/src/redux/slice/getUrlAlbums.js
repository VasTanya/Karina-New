import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAlbums = createAsyncThunk(
    'cakes/fetchFirstFotoStatus',
    async (params) => {
        const { urlAlboms } = params
        const { data } = await axios.get(urlAlboms)
        console.log(data);
        return  data 

    }
)

const initialState = {
    dataAlbums: [],
    aloboms: [],
    status: 'loading',
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
                 state.aloboms = action.payload.album
             
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.status = 'error'
                 state.dataAlbums = []
             
            })

    }
})

// export const {} = getUrlSlice.actions;
export default getUrlAlbums.reducer;