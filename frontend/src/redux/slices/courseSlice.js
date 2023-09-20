import { createSlice } from "@reduxjs/toolkit";

const initialState={
    course : {}
}

const courseSlice = createSlice({
    name : "course",
    initialState : initialState,
    reducers : {
        setCourse : (state,action) => {
            state.course ={...action.payload}
        }
    }
})

export default courseSlice.reducer
export const {setCourse} = courseSlice.actions