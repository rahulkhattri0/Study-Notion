import React from 'react'
import CourseCard from './CourseCard'

const TopCourses = ({data}) => {
  return (
    <>
      <p className='font-bold text-2xl ml-10 text-richblack-50'>Top Courses</p>
      <div className='mx-auto flex flex-col gap-y-2'>
          <div className='flex flex-wrap mt-4 gap-x-6 gap-y-4'>
              {
                data.length === 0 ? (<p className='text-richblack-100'>No Courses found</p>) : (
                  data.map((course)=>{
                    return <CourseCard key={course._id} data={course}/>
                  })
                )
              }
          </div>
      </div>
    </>
  )
}

export default TopCourses