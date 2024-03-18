const {courseModel} = require('../models/Courses')
const {userModel} = require('../models/User')
const {categoryModel} = require('../models/Category')
const {subSectionModel} = require('../models/SubSection')
const {sectionModel} = require('../models/Section')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const { courseProgressModel } = require('../models/CourseProgress')
const { default: mongoose, mongo } = require('mongoose')
const { ratingAndReviewModel } = require('../models/RatingAndReview')
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
        const thumbnail = req.files.thumbnail
        console.log("teh hai thumbnail",thumbnail)
        if(!courseName ||
            !courseDescription || 
            !price ||
            !whatYouWillLearn ||
            !category ||
            !thumbnail ||
            !tags ||
            !instructions){
            return res.status(400).json({
                success:false,
                message:'all fields required!! you did not give all the details'
            })
        }
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
        const allCourses = await courseModel.find({ status : { $eq : 'Published' } }).populate("instructor").populate("category")
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

//get a single course details multiple populates in this(without videoUrl)
exports.getCourseDetails = async(req,res)  => {
    try {
        const {courseId} = req.body
        console.log("id course ki",req.body)
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
                path:"subSection",
                select: '-videoUrl  -description'
            }
        }).populate({
            path:'ratingAndReviews',
            populate : {
                path : 'user',
                select : 'firstName image'
            },
        }).populate({
            path:'ratingAndReviews',
            populate : {
                path : 'course',
                select : 'courseName'
            },
        }).exec()
        if(!courseDetails){
            return res.json({
                success:false,
                message:'Could not find this course'
            })
        }
        return res.status(200).json({
            success:true,
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

exports.getAuthCourseDetails = async(req,res)  => {
    try {
        //general route to get course details for an authenticated user(with video url)
        //if the user owns the course(or has made the course in case of instructor) then return data else return error
        const {courseId} = req.body
        const userId = req.user.id
        const user = await userModel.findById({_id:userId}).populate("courseProgress")
        let courseDetails = await courseModel.find({_id:courseId})
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        if(!courseDetails){
            return res.json({
                success:false,
                message:'Could not find this course'
            })
        }
        let courseProgress;
        courseProgress = user.accountType==='Student' ? user.courseProgress.find((progress)=>String(progress.courseId)===courseId) : {}
        return res.status(200).json({
            success:true,
            message:'got the details for the course',
            data:courseDetails,
            courseProgress
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while getting the course details'
        })
    }
}


exports.publishCourse = async (req,res) => {
    try {
        const {courseId,category} = req.body
        await courseModel.findByIdAndUpdate({_id:courseId},{
            status : "Published"
        })
        //validating category - frontend se to nahi but postman se koi in valid id de sakta hai-so just simple validation
        const categoryDetails = await categoryModel.findById({_id:category})
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Invalid category given while creating course'
            })
        }
        //update category
        await categoryModel.findByIdAndUpdate({
            _id:category
        },{
            $push:{
                course : courseId
            }
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

exports.getInstructorCourses = async (req,res) => {
    const id = req.user.id
    try {
        const user = await userModel.findById({_id:id}).populate(
            {
                path : 'courses',   
                populate :{
                    path : 'courseContent',
                    populate : {
                        path : 'subSection',
                    }
                }
            }
        )
        return res.status(200).json({
            success : false,
            message:'got all user courses',
            data : user.courses
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while getting instructor courses'
        })       
    }
}

exports.editCourse = async (req,res) =>{
    try {
        const {courseId,...data} = req.body // this is how you exclude properties of objects using spread operator
        const image = req.files?.thumbnail
        console.log("pehle==",data)
        if(image){
            const response = await uploadImageToCloudinary(image,process.env.FOLDER_NAME)
            const url = response.secure_url
            data.thumbnail = url
        }
        const decodedTags = JSON.parse(data.tags)
        const decodedIns = JSON.parse(data.instructions)
        data.tags = decodedTags
        data.instructions = decodedIns
        console.log("data====",data)
        const updatedCourse = await courseModel.findByIdAndUpdate({_id:courseId},data,{new:true}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        return res.status(200).json({
            success : true,
            message : 'course updated successfully',
            data : updatedCourse
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while editing course'
        }) 
    }
}

exports.deleteCourse = async (req,res) => {
    try {
        const {courseId} = req.body
        const courseDetails = await courseModel.findById({_id:courseId}).populate(
            {
                path:"courseContent",
                populate:{
                    path:"subSection"
                }
            }
        )
        if(courseDetails.status === 'Published'){
            await categoryModel.findByIdAndUpdate({_id:courseDetails.category[0]},{
                $pull : {
                    course : courseId
                }
            })
        }
        await userModel.findByIdAndUpdate({_id:courseDetails.instructor},{
            $pull : {
                courses : courseId
            }
        })
        for(const content of courseDetails.courseContent){
            for(const subSection of content.subSection){
                await subSectionModel.findByIdAndDelete({_id:subSection._id})
            }
            await sectionModel.findByIdAndDelete({_id:content._id})
        }
        await courseProgressModel.deleteMany({
            courseId : courseId
        })
        for(const studentId of courseDetails.studentsEnrolled){
            await userModel.findByIdAndUpdate({_id:studentId},{
                $pull : {
                    courses : courseId
                }
            })
        }
        await ratingAndReviewModel.deleteMany({course:courseId})
        await courseModel.findByIdAndDelete({_id:courseId})
        return res.status(200).json({
            success : true,
            message : 'course deleted'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while deleting course'
        })
    }
    

}