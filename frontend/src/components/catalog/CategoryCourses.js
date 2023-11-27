import React, { useEffect, useState } from 'react'
import { FaCaretLeft,FaCaretRight } from "react-icons/fa6";
import CourseCard from './CourseCard'

const CategoryCourses = ({name,courses}) => {
  const [index,setIndex] = useState(0)
  useEffect(()=>{
    setIndex(0)
    const interval = setInterval(()=>{
      setIndex((prev)=>prev+1)
    },6000)
    return () => {
      clearInterval(interval)
    }
  },[courses])

  return (
    <>
        <div className='text-2xl font-bold mt-8 flex flex-row gap-x-2 mb-5'>
            <p className='text-richblack-25'>You might also like courses in</p> 
            <p className='text-yellow-25'>{name}</p>
        </div>
        <div className='mx-auto lg:w-[70%] md:w-[80%] sm:w-[90%] relative'>
          {
            courses.length>0 && <FaCaretLeft className='text-black text-4xl cursor-pointer bg-white rounded-r-md pr-1 hover:text-yellow-50 absolute left-1 top-1/2' onClick={()=>setIndex((prev)=>{
                if(prev===0) return courses.length-1;
                else return prev-1;
              })
            }
            />
          }
          {
            courses.length === 0 ? (
              <div className='text-center'>
                <p className='text-xl text-richblack-50'>No Courses Found !</p>
              </div>
            ) : (
              <CourseCard data={courses[index % courses.length]} imgStyle={'rounded-xl h-[500px] w-full object-cover'}/>
            )
          }
          {courses.length > 0 && <FaCaretRight className='text-black pl-1 bg-white text-4xl cursor-pointer rounded-l-md hover:text-yellow-50 absolute right-1 top-1/2' onClick={()=>setIndex((prev)=>prev+1)}/>}
        </div>  
    </>
    
  )
}

export default CategoryCourses