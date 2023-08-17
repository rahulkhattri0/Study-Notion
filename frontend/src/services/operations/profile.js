import { toast } from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";

const { GET_ENROLLED_COURSES } = profileEndpoints

export const getEnrolledCourses = async(token) => {
    const toastId = toast.loading("Loading...")
    let courses;
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
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
    return courses
}