const {subSectionModel, sectionModel} = require('../models/Section')
const {courseModel} = require('../models/Courses')


exports.createSection = async (req,res) =>{
    try {
        const {sectionName,courseId} = req.body
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'all fields required'
            })
        }
        const newSection = await sectionModel.create({
            sectionName:sectionName,
        })
        const updatedCourse = await courseModel.findByIdAndUpdate({_id:courseId},{
            $push:{
                courseContent : newSection._id
            }
        },{new:true})

        return res.status(200).json({
            success:true,
            message:'section created successfully',
            updatedCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'unable to create a section',
            error:error.message
        })
    }
}

exports.updateSection = async (req,res) =>{
    try {
        //data input 
        const {sectionName,sectionId} = req.body
        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:true,
                messsage:'all fields are required.'
            })
        }
        //update
        const updatedSection = await sectionModel.findByIdAndUpdate({_id:sectionId},{
            sectionName : sectionName
        },{new:true})
        return res.status(200).json({
              success:true,
              message:'successfully updated a section',
              updatedSection               
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'unable to update a section',
            error:error.message
        })
    }
}

exports.deleteSection = async(req,res) => {
    try {
        //get ID
        const {sectionId} = req.body 
        //find by id and delete
        await sectionModel.findByIdAndDelete({_id:sectionId})
        //todo[testing] : do we need to delete entry from course schema
        const {courseId} = req.body
        await courseModel.findByIdAndUpdate({_id:courseId},{
            $pull : {
                courseContent : sectionId 
            }
        })
        return res.status(200).json({
            success:true,
            message:'section deleted'
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'unable to delete a section',
            error:error.message
        })
    }
}