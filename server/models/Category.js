const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true
    },
    course:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }]
})

exports.categoryModel = mongoose.model("Category",categorySchema)