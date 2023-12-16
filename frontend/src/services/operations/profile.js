import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";



const { GET_ENROLLED_COURSES,GET_INSTRUCTOR_INCOME } = profileEndpoints

export const getEnrolledCourses = async(token) => {
    const toastId = toast.loading("Loading...")
    let courses;
    let courseProgress;
    try {
        const response = await apiConnector(
            "GET",
            GET_ENROLLED_COURSES,
            null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("get Enrolled course ka response---->",response)
        courses = response.data.data
        courseProgress = {values : response.data.courseProgressValues , courseProgress: response.data.courseProgress}
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return [courses,courseProgress]
}

export const getInstructorIncome = async(token) => {
    const toastId = toast.loading("Loading..")
    let totalIncome
    let courseData
    try {
        const response = await apiConnector(
            "GET",
            GET_INSTRUCTOR_INCOME,
            {},
            {
                Authorization: `Bearer ${token}`
            }
        )
        totalIncome = response.data.totalIncome
        courseData = response.data.courseData
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return [totalIncome,courseData]
}