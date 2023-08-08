const { mailSender } = require('../utils/mailSender')
require('dotenv').config()
exports.contact = async(req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            message
        } = req.body
        const ownerMail = process.env.MAIL_USER
        await mailSender(ownerMail,
            `Message from ${firstName}`,`The message is: ${message} From: ${firstName} ${lastName} email:${email}`)
        return res.status(200).json({
            success:false,
            message:"message sent"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"something went wrong while sending your message"
        })
    }
}