import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseContent : null,
    courseProgress : null
}

const viewCourseSlice = createSlice(
    {
        name : "viewCourse",
        initialState : initialState,
        reducers :  {
            setViewCourse : (state,action) => {
                state.courseContent = action.payload.courseContent
                state.courseProgress = action.payload.courseProgress
            },
            resetViewCourse : (state) => {
                state.courseContent = null
                state.courseProgress = null
            }
        }
    }
)

export default viewCourseSlice.reducer
export const {setViewCourse,resetViewCourse} = viewCourseSlice.actions 