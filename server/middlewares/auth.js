const jwt = require('jsonwebtoken')
const {userModel} = require('../models/User')

require('dotenv').config

//auth

exports.auth = async (req,res,next) => {
    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","")
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
                message:'Token is invalid'
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