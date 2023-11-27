import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCourseDetails } from '../services/operations/course'
import CourseDescription from '../components/catalog/CourseDetails/CourseDescription'

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
            <CourseDescription course={courseData}/>
          )
        }
    </>
  )
}

export default CoursePage