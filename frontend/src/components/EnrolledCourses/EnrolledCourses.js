import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CourseCard from './CourseCard'
import { getEnrolledCourses } from '../../services/operations/profile'
const EnrolledCourses = () => {
    const token = useSelector((store)=>store.auth.token)
    const [courses,setCourses] = useState(null)
    async function getCourses(){
        const courses =  await getEnrolledCourses(token)
        setCourses(courses)
    }
    useEffect(()=>{
        getCourses()
    },[])
  return (
    <>
        <h1 className='text-white font-inter'>Enrolled Courses</h1>
        {
          courses===null? (<h1 className='text-white'>Loading...</h1>) : (
            courses.length === 0 ? (<h1 className='text-white'>You have not enrolled in any courses</h1>) : (
              courses.map((course)=><CourseCard course={course} key={course._id}/>)
            )
          )
        }

    </>
  )
}

export default EnrolledCourses