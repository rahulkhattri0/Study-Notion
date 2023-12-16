import React from 'react'
import CourseSection from './CourseSection'

const CourseContent = ({content,requirements}) => {
  return (
    <>
        <p className='text-yellow-100 mb-2 text-2xl m-4 font-bold'>Course content</p>
        <div className='flex lg:flex-row md:flex-col flex-col m-4 gap-x-4 gap-y-4'>    
            <div className='lg:w-[50%] md:w-[100%] w-[100%]'>
                {
                content.length===0 ? (<p className='text-richblack-5'>No content yet!</p>) : content.map((section)=>{
                    return (
                        section.subSection.length > 0 && <CourseSection sectionData={section} key={section._id}/>
                        )
                    })
                }
            </div>
            <div className='lg:w-[50%] md:w-[100%] sm-w-[100%] rounded-sm'>
                <p className='text-2xl text-richblack-5 mb-4'>Requirements for the course</p>
                <ul>
                    {
                    requirements.map((requirement)=><li className='text-richblack-50' key={requirement.id}>{requirement.value}</li>)
                    }
                </ul>
            </div>
            </div>
            
    </>
    
  )
}

export default CourseContent