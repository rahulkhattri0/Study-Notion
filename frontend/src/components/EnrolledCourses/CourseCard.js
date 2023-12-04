import React from 'react'
import { Link } from 'react-router-dom'

const CourseCard = ({course,courseProgress,index}) => {
  return (
    <Link to={`/viewCourse/${course._id}`}>
        <div className='flex flex-row justify-between p-4 border-richblack-700 bg-richblack-800 border-[1px]'>
          <div className='flex gap-x-4 items-center rounded-md text-richblack-5'>
              <img
              src={course.thumbnail}
              alt={course.courseName}
              loading='lazy'
              className='object-cover w-[78px]'/>
            <div className='flex flex-col gap-y-2'>
                <p className='text-richblack-25 text-xl font-bold'>{course.courseName}</p>
                <p className='text-richblack-25 text-sm italic'>{course.courseDescription}</p>
            </div>  
          </div>
          <div className='flex flex-col gap-y-2'>
            <p className='text-richblack-5 text-lg'>Progress</p>
            <progress max={100} value={(courseProgress[index].completedSections.length*100)/course.courseContent.length}/>
          </div>
        </div>
        
    </Link>
    
  )
}

export default CourseCard