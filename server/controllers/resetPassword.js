const {userModel} = require('../models/User')
const {mailSender} = require('../utils/mailSender')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const { passwordChecker } = require('../utils/PasswordChecker')
exports.resetPasswordToken = async (req,res) => {
    try {
        const email = req.body.email
        //email verification
        const user = await userModel.findOne({email:email})
        if(!user){
            return res.status(404).json({
                success:false,
                message:'your email is not registered with us'
            })
        }
        const token = crypto.randomBytes(20).toString("hex")
        const updateDetails = await userModel.findOneAndUpdate({email:email},{
            token:token,
            resetPasswordExpires: Date.now() + 3600000
        },{new:true})
        const url = `http://localhost:3000/update-password/${token}`
        await mailSender(email,"Password reset link",`Password Reset Link: ${url}`)
        return res.status(200).json({
            success:true,
            message:'Email sent',
            token:token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while(generating token in reset password)'
        })
    }
}

exports.resetPassword = async (req,res) => {
    try {
        const {password,confirmPassword,token} = req.body
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:'passwords do not match'
            })
        }
        if(!passwordChecker(password)){
            return res.status(400).json({
                success: false,
                message : 'password is weak'
            })
        }
        const userDetails = await userModel.findOne({token:token})
        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:'token is invalid'
            })
        }
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:'Token expired'
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await userModel.findOneAndUpdate({token:token},{password:hashedPassword},{new:true})
        return res.status(200).json({
            success:true,
            message:'password reset successfully'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:true,
            message:'something went wrong while reseting password'
        })
    }
}