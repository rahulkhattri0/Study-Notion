const { default: mongoose } = require('mongoose')
const {instance} = require('../config/razorpay')
const {courseModel} = require('../models/Courses')
const {userModel} = require('../models/User')
const {mailSender} = require('../utils/mailSender')
const crypto = require("crypto")
exports.capturePayment = async(req,res) => {
    try {
        const {courseId} = req.body
        const userId = req.user.id
        if(!courseId) {
            return res.json({
                success:false,
                message:'Please provide valid course id'
            })
        }
        let courseDetails
        try {
            courseDetails = await courseModel.findById({_id:courseId}) 
            if(!courseDetails){
                return res.json({
                    success:false,
                    message:'No course details found for that course'
                })
            }
            const uid = new mongoose.Types.ObjectId(userId)
            if(courseDetails.studentsEnrolled.includes(uid)){
                return res.json(
                    {
                        success:false,
                        message:'user already enrolled no need to but the course'
                    }
                )
            }
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
        const amount = courseDetails.price
        const currency = "INR"
        const options = {
            amount : amount * 100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{
                courseId,
                userId
            }
        }
        try {
            //initiatethe payment
            const payment = await instance.orders.create(options)
            console.log("paymentres",payment)
            return res.status(200).json({
                success:true,
                message:'initiated order',
                courseName : courseDetails.courseName,
                thumbnail: courseDetails.thumbnail,
                courseDescription: courseDetails.courseDescription,
                orderId:payment.id,
                currency:payment.currency
            })
        } catch (error) {
            console.log(error)
            return res.json({
                success:false,
                message:'cloud not initiate order'
            })
        }
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:'something went wrong while capturing payment',
                error:error.message
            }
        )
    }
}

exports.verifySignature = async(req,res)=>{
    const webhookSecret = "12345678"
    const signature = req.headers["x-razorpay-signature"]
    const shasum = crypto.createHmac("sha256",webhookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest("hex")
    if(signature === digest){
        console.log("payment is authorized")
        //yaha notes kaam aayega
        const {courseId,userId} = req.body.payload.payment.entity.notes
        try {
            //fullfill the action
            const enrolledCourse = await courseModel.findByIdAndUpdate({_id:courseId},{
                $push:{
                    studentsEnrolled:userId
                }
            },{new:true})

            console.log("enrolled course",enrolledCourse)
            //update user model
            const enrolledStudent = await userModel.findByIdAndUpdate({_id:userId},{
                $push : {
                    courses : courseId
                }
            },{new:true}) 
            console.log(enrolledStudent)
            //mail send
            const emailResponse = await mailSender(enrolledStudent.email,
                "congratulations from study Notion",
                `bought course ${enrolledCourse.courseName}`)

            return res.status(200).json({
                success:false,
                message:'payment authorized and course added'
            })
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:'could not authorize payment'
            })
        }
    }
}