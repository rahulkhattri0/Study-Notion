const {profilemodel, profileModel} = require('../models/Profile')
const {userModel} = require('../models/User')
const {courseModel} = require('../models/Courses')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config
exports.updateProfile = async (req,res) => {
    try {
        const {dateOfBirth="",about="",contactNumber,gender} = req.body
        const id = req.user.id
        if(!contactNumber || !gender){
            return res.status(400).json({
                success:false,
                message:'all fields must be filled'
            })
        }
        const userDetails = await userModel.findById({_id:id})
        const profileId = userDetails.additionalDetails
        const profileDetails = await profileModel.findById({_id:profileId})
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.gender = gender
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber
        await profileDetails.save()

        return res.status(200).json({
            success:true,
            message:'profile updated successfully',
            profileDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong while updating profile',
            error:error.message
        })
    }
}

exports.deleteAccount = async (req,res) => {
    try {
        const id = req.user.id
        const userDetails = await userModel.findById({_id:id})
        if(!userDetails){
            return res.status(404).json({
                success:true,
                message:'User not found'
            })
        }

        //delete profile
        await profileModel.findByIdAndDelete({_id:userDetails.additionalDetails}) 
        //delete user
        const courses = userDetails.courses
        courses.forEach(async (course) => {
            await courseModel.findByIdAndUpdate({_id:course},{
                $pull : {
                    studentsEnrolled : id
                }
            })
        })
        await userModel.findByIdAndDelete({_id:id})
        return res.status(200).json({
            success:'true',
            message:'USer account deleted successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:'something went wrong while deleting a course',
            error:error.message
        })
    }
}

exports.getUserDetails = async(req,res) =>{
    try {
        const id = req.user.id
        const userDetails = await userModel.findById(id).populate("additionalDetails").populate("courses").exec()
        return res.status(200).json({
            success:true,
            message:'got all user details',
            userDetails
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while getting user Details',
            error:error.message
        })
    }
}

exports.updateProfilePicture = async(req,res) => {
    try {
        const pfp = req.files.pfp
        const userId = req.user.id
        const user = await userModel.findById({_id:userId})
        if(!user){
            return res.status(400).json({
                success:false,
                message:'user not found'
            })
        }
        const image = await uploadImageToCloudinary(
            pfp,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        const updatedProfile  = await userModel.findByIdAndUpdate(
            {_id : userId},
            {image : image.secure_url},
            {new:true}
        ).populate("additionalDetails")
        res.json({
            success:true,
            message:'Image Updated Successfully',
            data : updatedProfile,
            new_image : image.secure_url
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}

exports.getEnrolledCourses = async (req,res) => {
    try {
        const userId = req.user.id
        const userDetails = await userModel.findOne({
            _id : userId
        })
        .populate("courses")
        .populate({
            path:"courseProgress",
            populate:{
                path:"completedVideos"
            }
        })
        if(!userDetails) {
            return res.status(400).json(
                {
                    success : false,
                    message: `could not find user with id: ${userDetails}`
                }
            )
        }return res.status(200).json({
            success: true,
            data : userDetails.courses,
            courseProgress : userDetails.courseProgress
        })
        
    } catch (error) {
        return res.status(200).json({
            success: true,
            message : error.message
        })
    }
}


