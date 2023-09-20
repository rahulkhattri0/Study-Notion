import toast from "react-hot-toast";
import { courseEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setCourse } from "../../redux/slices/courseSlice";

const { CREATE_COURSE } = courseEndPoints
export const createCourse = async (data,token,dispatch) =>{
    const loadingToast = toast.loading("Loading...")
    try {
        const reponse = await apiConnector(
            "POST",
            CREATE_COURSE,
            data,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("Create course response---->",reponse)
        dispatch(setCourse(reponse.data.data))
        toast.success('Course created successfully')
    } catch (error) {
        
    }
    toast.dismiss(loadingToast)
}