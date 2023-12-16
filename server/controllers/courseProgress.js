const { courseProgressModel } = require("../models/CourseProgress")


exports.addSubSectionToCourseProgress = async(req,res) => {
    try {
        const {courseProgressId,subSectionId} = req.body
        await courseProgressModel.findByIdAndUpdate({_id:courseProgressId},{
            $push : {
                completedVideos : subSectionId
            }
        })
        return res.status(200).json({
            success : true,
            message : "Marked as done!"
        })
     } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}