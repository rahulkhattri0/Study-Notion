const express = require("express")
const router = express.Router()


//course controller 
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    publishCourse,
    getInstructorCourses,
    editCourse
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
const { auth,isInstructor,isStudent,isAdmin } = require('../middlewares/auth')

router.post("/createcourse",auth,isInstructor,createCourse)
router.put("/publishCourse",auth,isInstructor,publishCourse)
router.post("/addSection",auth,isInstructor,createSection)
router.post("/updateSection",auth,isInstructor,updateSection)
router.post("/deleteSection",auth,isInstructor,deleteSection)
router.post("/updateSubSection",auth,isInstructor,updateSubSection)
router.post("/addSubSection",auth,isInstructor,createSubSection)
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)
router.put("/editCourse",auth,isInstructor,editCourse)

router.get("/getAllCourses",getAllCourses)
router.post("/getCourseDetails",getCourseDetails)

//now category routes

router.post("/createCategory",auth,isAdmin,createCategory)
router.get("/showAllCategories",showAllcategories)
router.post("/getCategoryPageDetails",categoryPageDetails)

router.post("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)

module.exports = router