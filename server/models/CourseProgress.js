const mongoose = require('mongoose')

const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    },
    completedVideos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]
})

exports.courseProgressModel = mongoose.model("CourseProgress",courseProgressSchema)