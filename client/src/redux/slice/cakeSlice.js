import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 1,
    searchValue: '',
}

const cakeSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCurrentPage(state, action){
            state.currentPage = action.payload
        },
        setSearchValue(state, action){
            state.searchValue = action.payload
        },
    }

})

export const {setCurrentPage,setSearchValue} = cakeSlice.actions
export default cakeSlice.reducer
