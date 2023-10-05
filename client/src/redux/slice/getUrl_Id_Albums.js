import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_Id_Albums = createAsyncThunk(
    'cakes/fetch_Id_AlbumsStatus',
    async (params) => {
        const { url_Id_Albums } = params
        const { data } = await axios.get(url_Id_Albums)
        return { data }

    }
)

const initialState = {
    data_Id_Albums: [],
    status: 'loading',
}

const getUrl_Id_Albums = createSlice({
    name: 'albums_Id',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetch_Id_Albums.pending, (state) => {
                state.status = 'loading'
                state.data_Id_Albums = []
            })

            .addCase(fetch_Id_Albums.fulfilled, (state, action) => {
                state.status = 'successful'
                 state.data_Id_Albums = action.payload
             
            })
            .addCase(fetch_Id_Albums.rejected, (state) => {
                state.status = 'error'
                 state.data_Id_Albums = []
             
            })

    }
})

// export const {} = getUrlSlice.actions;
export default getUrl_Id_Albums.reducer;