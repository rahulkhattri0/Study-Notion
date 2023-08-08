import { createSlice } from "@reduxjs/toolkit";
import { tokenPermit } from "../../utils/utilities";


const initialState = {
    token : tokenPermit(),
    signUpData : null
}


const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers : {
        setToken : (state,action) =>{
            state.token = action.payload
        },
        setSignUpData : (state,action) => {
            state.signUpData = action.payload
        }
    }
})

export const {setToken,setSignUpData} = authSlice.actions 
export default authSlice.reducer