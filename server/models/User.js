const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
       type:String,
       enum:["Admin","Student","Instructor"],
       required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true 
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Courses"
    }],
    image:{
        type:String,
        required:true
    },
    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date
    }
})


exports.userModel = mongoose.model("User",userSchema)