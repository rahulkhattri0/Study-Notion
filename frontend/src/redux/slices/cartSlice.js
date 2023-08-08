import { createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"

//TODO : PENDING 

const initialState = {
    totalItems : localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0
}


const cartSlice = createSlice({
    name:"cart",
    initialState: initialState,
    reducers : {
        
    }
})

export const {setToken} = cartSlice.actions 
export default cartSlice.reducer