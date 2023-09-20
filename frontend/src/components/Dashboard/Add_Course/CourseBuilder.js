import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CourseBuilder = () => {
    const navigate = useNavigate()
    const {course} = useSelector((store)=>store.course)
    useEffect(()=>{
        if(Object.keys(course).length===0){
            navigate("/dashboard/my-profile")
        }
    },[])
  return (
    <div>
    </div>
  )
}

export default CourseBuilder