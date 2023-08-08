const express = require("express")
const router = express.Router()

const { auth } = require("../middlewares/auth")

const {
    updateProfile,
    deleteAccount,
    getUserDetails,
    updateProfilePicture,
    getEnrolledCourses
} = require('../controllers/profile')

router.delete("/deleteProfile", auth , deleteAccount)
router.put("/updateProfile",auth,updateProfile)
router.get("/getUserDetails", auth , getUserDetails)

router.get("/getEnrolledCourses",auth,getEnrolledCourses)
router.put("/updateDisplayPicture" , auth , updateProfilePicture)


module.exports = router