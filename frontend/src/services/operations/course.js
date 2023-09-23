import toast from "react-hot-toast";
import { courseEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setCourse } from "../../redux/slices/courseSlice";

const { 
    CREATE_COURSE,
    ADD_SECTION,
    UPDATE_SECTION,
    DELETE_SECTION
} = courseEndPoints
export const createCourse = async (data,token,dispatch) =>{
    const loadingToast = toast.loading("Loading...")
    try {
        const reponse = await apiConnector(
            "POST",
            CREATE_COURSE,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("Create course response---->",reponse)
        dispatch(setCourse(reponse.data.data))
        toast.success('Course created successfully')
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(loadingToast)
}

export const addSection = async (sectionName,courseId,token) =>{
    const loadingToast = toast.loading("Loading...")
    let data
    try {
        const response = await apiConnector(
            "POST",
            ADD_SECTION,
            {
                sectionName : sectionName,
                courseId : courseId
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("add section ka response-->",response)
        data = response.data.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(loadingToast)
    return data
}

export const updateSection = async (sectionId,sectionName,courseId,token) =>{
    const loadingToast = toast.loading("Loading...")
    let data
    try {
        const response = await apiConnector(
            "POST",
            UPDATE_SECTION,
            {
                sectionName : sectionName,
                sectionId : sectionId,
                courseId : courseId
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("edit section ka response-->",response)
        data = response.data.data
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(loadingToast)
    return data
}

export async function deleteSection(sectionId,courseId,token){
    const loadingToast = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            DELETE_SECTION,
            {
                sectionId : sectionId,
                courseId : courseId
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("delete section response---->",response)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(loadingToast)
}