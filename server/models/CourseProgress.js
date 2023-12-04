const mongoose = require('mongoose')

const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    },
    completedSections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ]
})

exports.courseProgressModel = mongoose.model("CourseProgress",courseProgressSchema)