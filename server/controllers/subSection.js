const {sectionModel} = require('../models/Section')
const {subSectionModel} = require('../models/SubSection')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const { courseModel } = require('../models/Courses') 
require('dotenv').config()
exports.createSubSection = async(req,res) =>{
    try{
        const {sectionId,title,description,courseId} = req.body
        const video = req.files.videoFile
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success:false,
                message:"all fields required"
            })
        }
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME)
        const subSubsection = await subSectionModel.create({
            title:title,
            timeDuration:`${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url
        })
        const updatedSection = await sectionModel.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:subSubsection._id
            }
        },{new:true})
        const course = await courseModel.findById({_id:courseId}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()
        return res.status(200).json({
            success:true,
            message:'created subsection successfully',
            data : course.courseContent
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'something went wrong while creating a subsection please try again',
            error:error.message
        })
    }
    
}
exports.updateSubSection = async (req,res) =>{
    try {
        const {subSectionId,title,description,courseId} = req.body
        const subSection = await subSectionModel.findById({_id:subSectionId})
        if(title){
            subSection.title = title
        } 
        if(description){
            subSection.description = description
        }
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files.videoFile
            console.log("video",video)
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }
        subSection.save()
        const course = await courseModel.findById({_id:courseId}).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        }).exec()
        return res.status(200).json({
            success:true,
            message:'successfully updated a subsection',
            data : course.courseContent               
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while updating a sub section',
            error:error.message
        })
    }
}

exports.deleteSubSection = async (req,res) =>{
    try {
        const {subSectionId,sectionId} = req.body
        const deletedsubSection = await subSectionModel.findByIdAndDelete({_id:subSectionId})
        await sectionModel.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subSection : subSectionId
            }
        })
        return res.status(200).json({
            success:true,
            message:'successfully deleted a subsection',
            deletedsubSection               
      })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while deleting a sub section',
            error:error.message
        })
    }
}