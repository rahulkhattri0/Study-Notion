import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { CONTACT } from "../apis"
export const contact = async (
    firstName,
    lastName,
    email,
    message
) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "POST",
            CONTACT,
            {
                firstName: firstName,
                lastName : lastName,
                email: email,
                message : message
            }
        )
        console.log("CONTACT KA RESPONSE ----->",response)
        toast.success("Your message has been sent")
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}