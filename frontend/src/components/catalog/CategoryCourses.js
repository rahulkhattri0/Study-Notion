import React, { useEffect, useState } from 'react'
import {BsArrowLeftCircle,BsArrowRightCircle} from 'react-icons/bs'
import CourseCard from './CourseCard'

const CategoryCourses = ({name,courses}) => {
  const [index,setIndex] = useState(0)
  useEffect(()=>{
    let interval
    setIndex(0)
    if(courses){
      interval = setInterval(()=>{
        // console.log("in interval")
       setIndex((prev)=>prev+1)
      },6000)
    }
    return () => {
      clearInterval(interval)
    }
  },[courses])

  return (
    <>
        <div className='text-2xl mx-auto font-bold mt-8 flex flex-row gap-x-2 mb-5'>
            <p className='text-richblack-25'>You might also like courses in</p> 
            <p className='text-yellow-25'>{name}</p>
         </div>
        <div className='relative lg:w-[70%] md:w-[80%] sm:w-[100%] mx-auto'>
          <BsArrowLeftCircle className='text-white text-2xl cursor-pointer hover:text-yellow-50 absolute left-[10%] top-1/2' onClick={()=>setIndex((prev)=>{
            if(prev===0) return courses.length-1;
            else return prev-1;
          })}/>
              <div className='mx-auto w-[70%] rounded-md'>
              {
                courses.length === 0 ? (<p className='text-xl text-richblack-50'>No Courses Found</p>) : (
                  <CourseCard data={courses[index % courses.length]} imgStyle={'rounded-xl h-[500px] w-full object-cover'}/>
                )
              }
            
            </div>
          <BsArrowRightCircle className='text-white text-2xl cursor-pointer hover:text-yellow-50 absolute right-[10%] top-1/2' onClick={()=>setIndex((prev)=>prev+1)}/>
        </div>
        
    </>
    
  )
}

export default CategoryCourses