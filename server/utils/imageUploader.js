const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary = async (file,folder) => {
    const options = {folder};
    options.quality = 40
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath,options)
}