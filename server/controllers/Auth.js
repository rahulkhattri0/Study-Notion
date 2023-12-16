const {userModel} = require("../models/User")
const {OTPModel} = require("../models/OTP")
const {profileModel} = require('../models/Profile')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {mailSender} = require('../utils/mailSender')
const { passwordChecker } = require('../utils/PasswordChecker')
require('dotenv').config()
exports.sendOTP = async(req,res)=>{
    try {
        const {email,password} = req.body

         //check if user already exists

        const checkUserExists = await userModel.findOne({email:email})
        if(checkUserExists){
            return res.status(401).json({
                success:false,
                message:"User already exists"
            })
        }
        if(!passwordChecker(password)){
            return res.status(401).json({
                success:false,
                message:"Password is weak"
            })
        }
        //generate OTP
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log("otp",otp)
        //not a very good workaround for unique otp
        let result = await OTPModel.findOne({otp:otp})
        console.log("result",result)
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            result = await OTPModel.findOne({otp:otp})
        }

        const otpPayload = {
            email:email,
            otp:otp
        }

        const otpBody = await OTPModel.create(otpPayload)
        console.log("OTP body",otpBody)

        return res.status(200).json({
            success:true,
            message:'OTP sent successfully',
            otp
        })

    } catch (error) {
        console.log("error while sending OTP")
        return res.status(500).json({
            success:false,
            message:'cant send otp',
            error:error.message
        })
    }
}

//signUp
exports.signUp = async(req,res) => {
    try {
        //data fetch from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp
        } = req.body
        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:'All fields are required'
            })
        }//2 password match
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Passwords do not match!'
            })
        }
        //check user already exist
        const exitsUser = await userModel.findOne({email})
        console.log("yeh hai user",exitsUser)
        if(exitsUser){
            return res.status(400).json({
                success:false,
                message:'user already exists'
            })
        }
        //find most recent otp
        const recentOtp = await OTPModel.findOne({email:email}).sort({createdAt:-1}).limit(1)
        console.log("recentOTP",recentOtp)
        //validate otp
        if (!recentOtp) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
		    });
        }
        if(otp!==recentOtp.otp){
            //Invalid otp
            return res.status(400).json({
                success:false,
                message:"otp's dont match"
            })
        }
        const checkPasswordStrength = passwordChecker(password)
        console.log("psswd str",checkPasswordStrength)
        if(!checkPasswordStrength){
            return res.status(400).json({
                success:false,
                message:"Password is weak"
            })
        }
        //initially these will be null user in future will fill these
        const profileDetails = await profileModel.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        //hash password and create entry in database
        //what is approved??-doubt
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await userModel.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword,
            accountType:accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })
        return res.status(200).json({
            success:true,
            message:'user registered successfully',
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'some error occurred while creating user.'
        })
    }
}

exports.login = async(req,res) =>{
    try {
        const {email,password} = req.body
        if(!email||!password){
            return res.status(403).json({
                success:false,
                message:'both entries required'
            })
        }
        console.log("pass",password)
        const user = await userModel.findOne({email:email}).populate("additionalDetails").populate().exec()
        if(!user){
            return res.status(401).json({
                success:false,
                message:'please sign up first!User not registered'
            })
        }
        console.log("user",user)
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email : email,
                id: user._id,
                role: user.accountType
            }
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"24h"
            })
            user.token = token
            user.password = undefined
            return res.status(200).json({
                success:true,
                message:'user logged in',
                user,
                token
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:'passwords do not match'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while logging in!'
        })
    }
}



exports.changePassword = async(req,res) => {
    try {
        const userDetails = await userModel.findById(req.user.id)

        const { oldPassword , newPassword } = req.body

        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if(!isPasswordMatch){
            return res.status(401)
            .json({
                success : false,
                message : "The password is incorrect."
            })
        }
        if(!passwordChecker(newPassword)){
            return res.status(401).json({
                success : false,
                message : 'The new Password is too weak'
            })
        }
        const encryptedPassword = await bcrypt.hash(newPassword,10)
        const updatedUserDetails = await userModel.findByIdAndUpdate(
            req.user.id,
            { password : encryptedPassword },
            {new : true}
        )
        try {
            const emailResponse = await mailSender(
                userDetails.email,
                "Password updated",
                "Your password has been changed!"
            )
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error occurred while sending email",
                error: error.message
            })
        }

        return res.status(200).json({
            success:true,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.log("error occurred while updating password: ",error)
        return res.status(500).json(
            {
                success:false,
                message: "Error occurred while updating password",
                error: error.message
            }
        )
    }
}