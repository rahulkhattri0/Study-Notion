import React from 'react'
import Ratings from './Ratings'


const CourseCard = ({data,imgStyle,customClasses}) => {
  return (
    <div className={`flex flex-col p-1 gap-y-2 ${customClasses}`} >
        <img
            className={imgStyle}
            src={data.thumbnail}
            alt='Course Thumbnail'
            loading='lazy'
        />
        <p className='text-richblack-50 text-lg'>{data.courseName}</p>
          <Ratings/>
        <p className='text-richblack-25 text-md'>Rs. {data.price}</p>
    </div>
  )
}

export default CourseCard