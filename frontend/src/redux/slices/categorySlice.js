import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    categories : []
}

const categorySlice = createSlice({
    name:"category",
    initialState : initialState,
    reducers : {
        setCategories : (state,action) => {
            state.categories = action.payload
        }
    }
})

export default categorySlice.reducer
export const {setCategories} = categorySlice.actions