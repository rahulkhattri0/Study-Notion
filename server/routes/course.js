const express = require("express")
const router = express.Router()


//course controller 
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    publishCourse,
    getInstructorCourses,
    editCourse,
    getAuthCourseDetails,
    deleteCourse
} = require('../controllers/course')

//category controller
const {
    createCategory,
    showAllcategories,
    categoryPageDetails
} = require('../controllers/category')

//section controller

const {
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/section')

//sub - section

const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require('../controllers/subSection')

//rating and review
const{
    createRating,
    getAllRating,
    getAverageRating
} = require('../controllers/ratingAndReview')

//middleware
const { auth,isInstructor,isStudent,isAdmin, ownCourse } = require('../middlewares/auth')
const { addSubSectionToCourseProgress } = require("../controllers/courseProgress")

router.post("/createcourse",auth,isInstructor,createCourse)
router.put("/publishCourse",auth,isInstructor,ownCourse,publishCourse)
router.post("/addSection",auth,isInstructor,ownCourse,createSection)
router.post("/updateSection",auth,isInstructor,ownCourse,updateSection)
router.post("/deleteSection",auth,isInstructor,ownCourse,deleteSection)
router.post("/updateSubSection",auth,isInstructor,ownCourse,updateSubSection)
router.post("/addSubSection",auth,isInstructor,ownCourse,createSubSection)
router.post("/deleteSubSection",auth,isInstructor,ownCourse,deleteSubSection)
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)
router.put("/editCourse",auth,isInstructor,ownCourse,editCourse)
router.post("/deleteCourse",auth,isInstructor,ownCourse,deleteCourse)
router.get("/getAllCourses",getAllCourses)
router.post("/getCourseDetails",getCourseDetails)
router.post("/getAuthCourseDetails",auth,ownCourse,getAuthCourseDetails)

//now category routes

router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllcategories)
router.post("/getCategoryPageDetails",categoryPageDetails)

router.post("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)

router.post("/addSubSectionToCourseProgress",auth,isStudent,addSubSectionToCourseProgress)

module.exports = router