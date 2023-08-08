const {categoryModel} = require('../models/Category')

exports.createCategory = async (req,res) =>{
    try {
        const {name,description} = req.body
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        const category = await categoryModel.create({
            name:name,
            description:description
        })
        return res.status(200).json({
            success:true,
            message:'category created successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'somethin went wrong while creating a category'
        })
    }
}

exports.showAllcategories = async (req,res) =>{
    try {
        const allcategories = await categoryModel.find({},{name:true,description:true})
        return res.status(200).json({
            success:false,
            message:'all categories fetched',
            data : allcategories
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'something went wrong while getting all categories'
        })
    }
}

exports.categoryPageDetails = async(req,res) =>{
    try {
        const {categoryId} = req.body
        const selectedCategory = await categoryModel.findById(categoryId)
                                                    .populate("course")

        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:'Data not found'
            })
        }
        //TODO - top selling courses(pending)
        const differentCategories = await categoryModel.find({
            _id: { $ne : categoryId}
        }).populate("course")
        return res.status(200).json({
            success:true,
            data:{
                selectedCategory,
                differentCategories
            }
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:error.message,
            message:'something went wrong while getting category page details'
        })
    }
}