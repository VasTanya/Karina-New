import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetch_Id_Albums = createAsyncThunk(
    'cakes/fetch_Id_AlbumsStatus',
    async (params) => {
        const { url_Id_Albums } = params
        const { data } = await axios.get(url_Id_Albums)
        //  console.log(data);
        return { data }

    }
)

const initialState = {
    data_Id_Albums: [],
    statusId: 'loading',
}



const getUrl_Id_Albums = createSlice({
    name: 'albums_Id',
    initialState,
    redusers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetch_Id_Albums.pending, (state) => {
                state.statusId = 'loading'
                state.data_Id_Albums = []
            })

            .addCase(fetch_Id_Albums.fulfilled, (state, action) => {
                state.statusId = 'successful'
                 state.data_Id_Albums = action.payload
             
            })
            .addCase(fetch_Id_Albums.rejected, (state) => {
                state.statusId = 'error'
                 state.data_Id_Albums = []
             
            })

    }
})

// export const {} = getUrlSlice.actions;
export default getUrl_Id_Albums.reducer;