import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
const Requirements = ({
    register,
    setValue,
    errors,
}) => {
    const {course,editCourse} = useSelector((store)=>store.course)
    const inputRef = useRef()
    const [requirements,setRequirements] = useState(!course.instructions ? [] : course.instructions)
    useEffect(()=>{
        register("instructions",{validate : (req)=>req.length>0})
    },[])
    useEffect(()=>{
        setValue("instructions",requirements)
    },[requirements])
    useEffect(()=>{
        if(!editCourse){
            setRequirements([])
        }
    },[editCourse])
  return (
    <div className='flex flex-col gap-y-2'>
        <label
            className='label-style' 
            htmlFor='requirements'
        >Requirements of the course <sup className="text-pink-200">*</sup></label>
        <input
            className='form-style'
            name='requirements'
            id='requirements'
            ref={inputRef}
            placeholder='Enter Requirements...'
        />
        {
            errors.instructions && (
                <p className='warning-style'>Please add some requirements</p>
            )
        }
        <p
            className='cursor-pointer text-sm text-yellow-50'
            onClick={()=>{
                console.log(inputRef.current.value)
                const reqValue = inputRef.current.value.trim() 
                if(reqValue.length>0){
                    const newRequirements = [...requirements,{id:requirements.length + 1,value : reqValue}]
                    setRequirements(newRequirements)
                    inputRef.current.value = ""
                }
            }}
        >Add</p>
        {
            requirements.length > 0 && (
                <div className='flex flex-col gap-y-1'>
                {
                    requirements.map((req)=>(
                        <div className='flex flex-row gap-x-2 items-center' key={req.id}>
                            <p className='text-md text-richblack-25'>{req.value}</p>
                            <p 
                                className='text-xs text-richblack-100 cursor-pointer'
                                onClick={()=>{
                                    const newReq = requirements.filter((ele)=>ele.value!==req.value)
                                    setRequirements(newReq)
                                }}>Clear</p>
                        </div>
                    ))
                }
                </div>
            )
        }
    </div>
  )
}

export default Requirements