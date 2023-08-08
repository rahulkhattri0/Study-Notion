const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories"
}

export const authEndpoints = {
    LOGIN : BASE_URL + "/auth/login",
    SENDOTP : BASE_URL + "/auth/sendotp",
    SIGNUP : BASE_URL + "/auth/signup",
    RESETPASSWORDTOKEN : BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD : BASE_URL + "/auth/reset-password"
}

export const CONTACT = BASE_URL + "/general/contact"