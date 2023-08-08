const mongoose = require('mongoose')
const {mailSender} = require('../utils/mailSender')
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 60 * 5
    }
})

//to send email
async function sendVerificationEmail(email,otp){
    try {
        const mailResponse = await mailSender(email,"verification email from study notion",otp)
        console.log(mailResponse)
    } catch (error) {
        console.log("error occurred while sending mail",error.message)
        throw error
    }
}
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp)
    next()
})

exports.OTPModel = mongoose.model("OTP",OTPSchema)
