const {courseModel} = require('../models/Courses')
const {userModel} = require('../models/User')
const {categoryModel} = require('../models/Category')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
require('dotenv').config()
//create course 
exports.createCourse = async(req,res) =>{
    try {
        console.log("req,body-->",req.body)
        //featch data
        const {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            category,
            tags,
            instructions,
        } = req.body
        let {status} = req.body
        const thumbnail = req.files.thumbnailImage
        console.log("teh hai thumbnail",thumbnail)
        if(!courseName ||
            !courseDescription || 
            !price ||
            !whatYouWillLearn ||
            !category ||
            !thumbnail ||
            !tags ||
            !instructions){{
            return res.status(400).json({
                success:false,
                message:'all fields required!! you did not give all the details'
            })
        }}
        if(!status || status===undefined){
            status = "Draft"
        }
        const userId = req.user.id
        console.log("userId",userId)
        //just validating that details exist for userId
        const userIdDetails = await userModel.findById({_id:userId})
        console.log("userIdDetails",userIdDetails)
        if(!userIdDetails){
            return res.status(404).json({
                success:false,
                message:'Instructor not found while creating course'
            })
        }
        //validating tag
        const categoryDetails = await categoryModel.findById({_id:category})
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Invalid category given while creating course'
            })
        }
        //uploading image to cloudinary
        const thumbnailImageUrl = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME)
        const decodedTags = JSON.parse(tags)
        const decodedIns = JSON.parse(instructions)
        //create an entry in DB
        const newCousre = await courseModel.create({
            courseName:courseName,
            courseDescription:courseDescription,
            instructor:userId,
            whatYouWillLearn:whatYouWillLearn,
            price:price,
            category:category,
            thumbnail: thumbnailImageUrl.secure_url,
            instructions : decodedIns,
            tags: decodedTags,
            status:status
        })
        //update user
        await userModel.findByIdAndUpdate({
            _id:userId
        },
        {
            $push:{
                courses : newCousre._id
            },
        },{new:true})
        //update tag
        await categoryModel.findByIdAndUpdate({
            _id:category
        },{
            $push:{
                course : newCousre._id
            }
        },{new:true})
        return res.status(200).json({
            success:false,
            message:"Course created successfully",
            data:newCousre
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while creating course',
            error:error.message
        })
    }
}


//get all course
exports.getAllCourses = async (req,res) =>{
    try {
        const allCourses = await courseModel.find({}).populate("instructor").populate("category")
        return res.status(200).json({
            success:true,
            message:'data for all courses fetched',
            data: allCourses
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while getting all course'
        })
    }
}

//get a single course details multiple populates in this
exports.getCourseDetails = async(req,res)  => {
    try {
        const {courseId} = req.body
        const courseDetails = await courseModel.find({_id:courseId}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()
        if(!courseDetails){
            return res.json({
                success:false,
                message:'Could not find this course'
            })
        }
        return res.status(200).json({
            success:false,
            message:'got the details for the course',
            data:courseDetails
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while getting the course details'
        })
    }
}

exports.publishCourse = async (req,res) => {
    try {
        const {courseId} = req.body
        await courseModel.findByIdAndUpdate({_id:courseId},{
            status : "Published"
        })
        return res.status(200).json({
            success : true,
            message : 'published course'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while publishing course'
        })
    }
}