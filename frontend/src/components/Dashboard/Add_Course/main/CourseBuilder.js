import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'
import {IoMdAdd} from 'react-icons/io'
import { setCourse } from '../../../../redux/slices/courseSlice'
import NestedView from '../NestedView'
import { addSection, updateSection } from '../../../../services/operations/course'


const CourseBuilder = () => {
    const navigate = useNavigate()
    const {course} = useSelector((store)=>store.course)
    const {_id} = course
    const {token} = useSelector((store)=>store.auth)
    const dispatch = useDispatch()
    const [sectionId,setSectionId] = useState("")
    useEffect(()=>{
        if(Object.keys(course).length===0){
            navigate("/dashboard/my-profile")
        }
    },[])
    const { formState,handleSubmit,register,setValue } = useForm()
    const {errors} = formState
    async function submit(data){
      const sectionName = data.sectionName.trim()
      const updatedContent = sectionId.length>0 ? 
      await updateSection(sectionId,sectionName,_id,token) :
      await addSection(sectionName,_id,token)
      updatedContent && dispatch(setCourse({
        ...course,
        courseContent : updatedContent
      }))
      setValue("sectionName","")
      setSectionId("")
    }
  return (
    <div className='rounded-md lg:w-[70%] md:w-[90%] sm:w-[100%]  mx-auto border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
        <div className='flex flex-col gap-y-6'>
            <form onSubmit={handleSubmit(submit)}>
              <div className='flex flex-col gap-y-2'>
                <label className='label-style' htmlFor='sectionName'>Section Name</label>
                <input 
                  className='form-style'
                  id='sectionName'
                  name='sectionName'
                  {...register("sectionName",{required:true})}
                />
                {
                  errors.sectionName && (
                    <p className='warning-style'>
                      Please Enter Section Name
                    </p>
                  )
                }
                <IconBtn
                  text={ sectionId.length>0 ? "Edit Section Name" : "Create Section" }
                  type='submit'
                  customClasses={'max-w-max'}
                >
                  <IoMdAdd/>
                </IconBtn>
                {
                  sectionId.length>0 && <p className='text-md text-richblack-100 cursor-pointer' onClick={()=>{
                    setSectionId("")
                    setValue("sectionName","")}}>Cancel</p>
                }
              </div>
            </form>
            <NestedView 
              setSectionId={setSectionId}
              setValue={setValue}
            />
        </div>
    </div>
  )
}

export default CourseBuilder