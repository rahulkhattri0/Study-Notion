const mongoose = require('mongoose')

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
        trim:true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Courses"
    }

})

exports.ratingAndReviewModel = mongoose.model("RatingAndReview",ratingAndReviewSchema)