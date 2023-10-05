import React from 'react'
import Ratings from './Ratings'

const CourseCard = ({data}) => {
  return (
    <div className='flex flex-col p-1 gap-y-2'>
        <img
            className='rounded-md object-cover h-[200px]'
            src={data.thumbnail}
            alt='Course Thumbnail'
        />
        <p className='text-richblack-50 text-lg'>{data.courseName}</p>
        <Ratings/>
        <p className='text-richblack-25 text-md'>Rs. {data.price}</p>
    </div>
  )
}

export default CourseCard