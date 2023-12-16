import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/course'
import CourseDescription from '../components/catalog/CourseDetails/CourseDescription'
import CourseContent from '../components/catalog/CourseDetails/CourseContent'
import WhatYouWillLearn from '../components/catalog/CourseDetails/WhatYouWillLearn'
import Footer from '../components/catalog/CourseDetails/Footer'

const CoursePage = () => {
  const location = useLocation()
  const [courseData,setCourseData] = useState(null)
  useEffect(()=>{
    fetchCourseData()
  },[])
  async function fetchCourseData(){
    const course_id = location.pathname.split("/")[2]
    console.log(course_id)
    const data = await getCourseDetails(course_id)
    setCourseData(data)
  }
  return (
    <>
        {
          courseData && (
            <>
              <CourseDescription course={courseData}/>
              <WhatYouWillLearn data={courseData.whatYouWillLearn}/>
              <CourseContent content={courseData.courseContent} requirements={courseData.instructions}/>
              <Footer instructorName={courseData.instructor?.firstName + " " + courseData.instructor?.lastName} instructorImage={courseData.instructor?.image} />
            </>
          )
        }
    </>
  )
}

export default CoursePage