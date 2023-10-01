import { createSlice } from "@reduxjs/toolkit";

const initialState={
    course : {},
    step : 1,
    editCourse : false,
}

const courseSlice = createSlice({
    name : "course",
    initialState : initialState,
    reducers : {
        setCourse : (state,action) => {
            state.course ={...action.payload}
        },
        setStep : (state,action) => {
            state.step = action.payload
        },
        setEditCourse : (state,action) => {
            state.editCourse = action.payload
        },
        resetCourse : (state) => {
            state.course = {}
            state.editCourse = false
            state.step = 1
        }
    }
})

export default courseSlice.reducer
export const {setCourse,setStep,setEditCourse,resetCourse} = courseSlice.actions