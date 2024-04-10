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
        type:[{
            id : {type:Number},
            value : {type:String}
        }],
        required:true
    },
    instructions : {
        type:[{
            id : {type:Number},
            value : {type:String}
        }],
        required:true
    },
    status : {
        type:String,
        enum: ["Draft","Published"]
    },
    avgRating : {
        type:Number,
        default : 0,
        max:5
    }
})

exports.courseModel = mongoose.model("Courses",courseSchema)