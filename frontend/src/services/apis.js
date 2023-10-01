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

export const settingsEndpoints = {
    UPDATE_PROFILE : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD : BASE_URL + "/auth/changepassword",
    DELETE_PROFILE : BASE_URL + "/profile/deleteProfile",
    UPDATE_PROFILE_PICTURE : BASE_URL + "/profile/updateDisplayPicture"
}

export const profileEndpoints = {
    GET_ENROLLED_COURSES : BASE_URL + "/profile/getEnrolledCourses"
}


export const courseEndPoints = {
    CREATE_COURSE : BASE_URL + "/course/createcourse",
    ADD_SECTION : BASE_URL + "/course/addSection",
    UPDATE_SECTION : BASE_URL + "/course/updateSection",
    DELETE_SECTION : BASE_URL + "/course/deleteSection",
    ADD_SUBSECTION : BASE_URL + "/course/addSubSection",
    UPDATE_SUBSECTION : BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION : BASE_URL + "/course/deleteSubSection",
    PUBLISH_COURSE : BASE_URL + "/course/publishCourse",
    GET_INSTRUCTOR_COURSES : BASE_URL + "/course/getInstructorCourses",
    EDIT_COURSE : BASE_URL + "/course/editCourse"
}