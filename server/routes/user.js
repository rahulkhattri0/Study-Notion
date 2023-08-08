const express = require("express")
const router  = express.Router()

const {
    sendOTP,
    signUp,
    login,
    changePassword
} = require('../controllers/Auth')


const {
    resetPasswordToken,
    resetPassword
} = require('../controllers/resetPassword')

const { auth } = require('../middlewares/auth')


router.post("/login",login)

router.post("/signUp",signUp)

router.post("/sendOtp",sendOTP)

router.post("/changepassword",auth,changePassword)

router.post("/reset-password-token",resetPasswordToken)

router.post("/reset-password",resetPassword)



module.exports = router