const jwt = require('jsonwebtoken')
const { userModel } = require('../models/User')


require('dotenv').config

//auth

exports.auth = async (req,res,next) => {
    try {
        //extract token
        const token = req.body.token || req.header("Authorization").replace("Bearer ","")
        console.log("token---->",token)
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing'
            })
        }
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET)
            console.log("decoded token payload,",decode)
            req.user = decode
        } catch (error) {
            return res.status(401).json({
                success:false,
                message:'Token is invalid! Please Logout'
            })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success:false,
            message:'something went wrong while validating otp'
        })
    }
}

exports.isStudent = async(req,res,next) => {
    try {
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for students'
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong while verifying user(student)'
        })
    }
}
exports.isInstructor = async(req,res,next) => {
    try {
        if(req.user.role !== 'Instructor'){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Instructors'
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong while verifying user(Instructor)'
        })
    }
}
exports.isAdmin = async(req,res,next) => {
    try {
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:'This is a protected route for Admins'
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong while verifying user(Admins)'
        })
    }
}

exports.ownCourse = async(req,res,next) => {
    try {
        const userId = req.user.id;
        const {courseId} = req.body
        const userDetails = await userModel.find({_id:userId,courses:{
            $elemMatch : {$eq : courseId}
        }})
        console.log("own course details",userDetails)
        if(userDetails.length===0){
            return res.status(401).json({
                success:false,
                message:"You do not own this course!"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong while checking for owning course'
        })
    }
}