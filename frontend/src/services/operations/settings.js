import { toast } from "react-hot-toast";
import { settingsEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setUser } from "../../redux/slices/profileSlice";

const { UPDATE_PROFILE } = settingsEndpoints

export const updateProfile = async (data,dispatch,token,user) =>{
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "PUT",
            UPDATE_PROFILE,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        const updated = response.data.profileDetails
        console.log("updated....",updated)
        const updatedUser = {
            ...user,
            additionalDetails:updated
        }
        dispatch(setUser(updatedUser))
        localStorage.setItem("user",JSON.stringify(updatedUser))
        toast.success("Profile updated")
        console.log("upodate profile aka response-->",response)
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}