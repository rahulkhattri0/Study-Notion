import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import {FiEdit2} from 'react-icons/fi'
import {MdOutlineDelete} from 'react-icons/md'
import Modal from '../../common/Modal'
import { setCourse } from '../../../redux/slices/courseSlice'
import { deleteSection } from '../../../services/operations/course'
const NestedView = ({setSectionId}) => {
    const {course} = useSelector((store)=>store.course)
    const {token} = useSelector((store)=>store.auth)
    const [deleteSectionId,setDeleteSectionId] = useState(false)
    const dispatch = useDispatch()
    async function handleDeleteSection(sectionId){
        console.log("token",token)
        await deleteSection(sectionId,course._id,token)
        const newContent = course.courseContent.filter((content)=>content._id !== sectionId)
        console.log("new content",newContent)
        dispatch(setCourse({
            ...course,
            courseContent : newContent
        }))
    }
  return (
    course.courseContent && course.courseContent.length>0 &&
    (
        <div className='rounded-md bg-richblack-700 p-4 text-black flex flex-col gap-y-3'>
        {
            course.courseContent.map((section)=>{
                return (
                    <details key={section._id}>
                        <summary className='flex flex-row justify-between border-b-2 border-richblack-600'>
                            <div className='flex flex-row gap-x-2 items-center text-richblack-100'>
                                <RxDropdownMenu className='text-2xl cursor-pointer'/>
                                <p className='text-lg font-semibold'>{section.sectionName}</p>
                            </div>
                            <div className='flex flex-row gap-x-3 text-richblack-100 items-center'>
                                <FiEdit2 className='cursor-pointer hover:text-yellow-50 text-xl' onClick={ () =>setSectionId(section._id)}/>
                                <MdOutlineDelete className='cursor-pointer text-2xl hover:text-red-100 hover:animate-bounce' onClick={()=>setDeleteSectionId(section._id)}/>
                            </div>
                        </summary>
                        
                    </details>
                )
            })
        }
        {
            deleteSectionId.length>0 && <Modal
                modalData={{
                    text1:"Are You sure",
                    text2:"This section will Be deleted",
                    btn1Text: "Proceed",
                    btn1Handler:()=>{
                        handleDeleteSection(deleteSectionId)
                        setDeleteSectionId("")},
                    btn2Text : "Cancel",
                    btn2Handler: () => {setDeleteSectionId("")}
                }}
            />
        }
        </div>
    )
  )
}

export default NestedView