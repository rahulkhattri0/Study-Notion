import React from 'react'

const CourseCard = ({course}) => {
  return (
    <div className='flex gap-x-4 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5 m-5'>
        <div className='rounded-md w-[78px] object-cover'>
            <img
            src={course.thumbnail}
            alt={course.courseName}></img>
        </div>
        <div className='flex flex-col gap-y-2'>
            <p className='text-richblack-25 text-xl font-bold'>{course.courseName}</p>
            <p className='text-richblack-25 text-sm italic'>{course.courseDescription}</p>
        </div>  
    </div>
  )
}

export default CourseCard