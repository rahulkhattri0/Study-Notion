const mongoose = require('mongoose')

require('dotenv').config

const options = {
    useNewUrlParser:true,
    useUnifiedTopology:true
}

exports.dbConnect = () =>{
    mongoose.connect(process.env.DB_URL,options)
.then(()=>console.log("DB connected"))
.catch((error)=>{
    console.log(`some error while connecting to mongoDB : ${error.message}`)
    process.exit(1)
})
}