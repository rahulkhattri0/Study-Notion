const express = require("express")
const app = express()
const dotenv = require('dotenv')
const userRoutes = require('./routes/user')
const courseRoutes = require('./routes/course')
const paymentsRoutes = require('./routes/payments')
const profileRoutes = require('./routes/profile')
const generalRoutes = require('./routes/general')
dotenv.config()
const PORT = process.env.PORT || 4000
const {dbConnect} = require('./config/database')
dbConnect()

app.use(express.json())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
//cross origin resource sharing -> so that calls from frontend can be entertained
const cors = require('cors')
app.use(
    cors({
        origin: ["https://study-notion-frontend.netlify.app","http://localhost:3000"],
        credentials:true
    })
)
const {cloudinaryConnect} = require('./config/cloudinary')
cloudinaryConnect()

const fileUpload = require('express-fileupload')
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/profile",profileRoutes)
app.use("/api/v1/payment",paymentsRoutes)
app.use("/api/v1/general",generalRoutes)
app.get("/",(req,res)=>{
    return res.status(200).json({
        success:true,
        message:'Home page for backend.....'
    })
})
app.listen(PORT,()=>{
    console.log("SERVER IS UP!")
})
