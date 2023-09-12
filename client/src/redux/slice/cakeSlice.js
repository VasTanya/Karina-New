import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 1
}

const cakeSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setCurrentPage(state, action){
            state.currentPage = action.payload
        }
    }

})

export const {setCurrentPage} = cakeSlice.actions
export default cakeSlice.reducer
