const {ratingAndReviewModel} = require('../models/RatingAndReview')
const {courseModel} = require('../models/Courses')
const { mongoose } = require('mongoose')


exports.createRating = async(req,res) => {
    try {
        const userId = req.user.id
        const {rating,review,courseId} = req.body
        const courseDetails = await courseModel.findOne({_id:courseId,
        studentsEnrolled : {$elemMatch : {$eq : userId}}}).populate('ratingAndReviews')
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:'user has not enrolled in the course'
            })
        }
        const alreadyReviewed = await ratingAndReviewModel.findOne({user:userId,course:courseId})
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:'User has already reviewed'
            })
        }
        const ratingReview = await ratingAndReviewModel.create({
            rating:rating,
            review:review,
            user:userId,
            course:courseId
        })
        const  ratingSum = courseDetails.ratingAndReviews.reduce((acc,curr)=>acc+curr.rating,0) + rating
        const numRating = courseDetails.ratingAndReviews.length + 1
        const averageRating = parseFloat((ratingSum/numRating).toFixed(1))
        await courseModel.findByIdAndUpdate({_id:courseId},{
            $push : {
                ratingAndReviews : ratingReview._id
            },
            avgRating : averageRating
        },{new:true})
        return res.status(200).json({
            success:true,
            message:'rating and review added to the course'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'something went wrong while creating rating and review'
        })
    }
}

// exports.getAverageRating  = async (req,res) => {
//     try {
//         const courseId = req.body.courseId
//         const result = await ratingAndReviewModel.aggregate([
//             {
//                 $match : {
//                     course : new mongoose.Types.ObjectId(courseId)
//                 },
                
//             },
//             {
//                 $group : {
//                     _id:null,
//                     averageRating : { $avg : "$rating" }
//                 }
//             }
//         ])
//         //aggregate returns an array
//         if(result.length>0){
//             return res.status(200).json({
//                 success:true,
//                 averageRating: result[0].averageRating
//             })
//         }
//         if(result.length==0){
//             return res.status(200).json({
//                 success:true,
//                 message:'Zero ratings',
//                 averageRating:0
//             })
//         }
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:'something went wrong while aggregating rating and review'
//         })
//     }
// }

exports.getAllRating = async(req,res) => {
    try {
        const allReviews = await ratingAndReviewModel.find({}).populate({
            path:"user",
            select:"firstName lastName email image"
        })
        .populate({
            path:"course",
            select : "courseName"
        })
        return res.status(200).json({
            success:true,
            message:"all ratings fetched",
            data:allReviews
        })
    } catch (error) {
            return res.status(500).json({
                success:false,
                message:'something went wrong while getting all rating and review'
            })
    }
}