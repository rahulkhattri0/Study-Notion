const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    whatYouWillLearn:{
        type:String,
        trim:true
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section"
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number
    },
    thumbnail:{
        type:String
    },
    category:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        }
    ],
    studentsEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
    ],
    tags:{
        type:[Object],
        required:true
    },
    instructions : {
        type : [Object],
        required:true
    },
    status : {
        type:String,
        enum: ["Draft","Published"]
    }
})

exports.courseModel = mongoose.model("Courses",courseSchema)