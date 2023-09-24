import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import {FiEdit2} from 'react-icons/fi'
import {MdOutlineDelete} from 'react-icons/md'
import Modal from '../../common/Modal'
import { setCourse } from '../../../redux/slices/courseSlice'
import { deleteSection, deleteSubSection } from '../../../services/operations/course'
import {IoIosAdd} from 'react-icons/io'
import SubSectionModal from './SubSectionModal'
const NestedView = ({setSectionId,setValue}) => {
    const {course} = useSelector((store)=>store.course)
    const {token} = useSelector((store)=>store.auth)
    const [deleteSectionId,setDeleteSectionId] = useState("")
    const [addSubSection,setAddSubSection] = useState(null)
    const [editSubSection,setEditSubSection] = useState(null)
    const [modalData,setModalData] = useState(null)
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
    async function handleDeleteSubSection(subSectionId,sectionId){
        await deleteSubSection(sectionId,subSectionId,token)
        const updatedContent = course.courseContent.map((content)=>{
            if(content._id===sectionId){
                const newSubsections = content.subSection.filter((element)=>element._id!==subSectionId)
                return {
                    ...content,
                    subSection : newSubsections
                }
            }
            return content
        })
        console.log("updated",updatedContent)
        dispatch(setCourse({
            ...course,
            courseContent : updatedContent
        }))
        setModalData(null)
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
                                <FiEdit2 className='cursor-pointer hover:text-yellow-50 text-xl' onClick={() =>{
                                        setSectionId(section._id)
                                        setValue("sectionName",section.sectionName)
                                    }}/>
                                <MdOutlineDelete className='cursor-pointer text-2xl hover:text-red-100 hover:animate-pulse' onClick={()=>setDeleteSectionId(section._id)}/>
                            </div>
                        </summary>
                        <div className='ml-10 flex flex-col gap-y-2 cursor-pointer p-2'>
                            {
                                section.subSection.map((subSection)=>{
                                    return (
                                        <div className='border-b-2 border-richblack-600 flex flex-row justify-between' key={subSection._id}>
                                            <p className='text-richblack-100'>{subSection.title}</p>
                                            <div className='flex flex-row gap-x-2 items-center text-richblack-100'>
                                                <p>{parseInt(subSection.timeDuration)} s</p>
                                                <FiEdit2 className='text-md cursor-pointer hover:text-yellow-50' onClick={()=>{
                                                    console.log(subSection)
                                                    setEditSubSection({
                                                        ...subSection,
                                                        subSectionId:subSection._id
                                                    })
                                                }}/>
                                                <MdOutlineDelete className='text-xl cursor-pointer hover:text-red-100 hover:animate-pulse' onClick={()=>{
                                                    setModalData({
                                                        text1:"Are You Sure?",
                                                        text2: "This Sub-Section will be deleted",
                                                        btn1Text : "Proceed",
                                                        btn2Text : "Cancel",
                                                        btn1Handler : ()=>{handleDeleteSubSection(subSection._id,section._id)},
                                                        btn2Handler: ()=>{setModalData(null)}
                                                    })
                                                }}/>
                                            </div>
                                        </div>        
                                    )
                                })
                            }
                            <div className='font-bold text-yellow-50 flex flex-row gap-x-1 items-center text-md'>
                                <IoIosAdd className='text-md'/>
                                <p onClick={()=>{
                                    setAddSubSection({
                                        sectionId : section._id     
                                    })
                                }}>Add Lecture</p>
                            </div>
                        </div>
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
        {
            addSubSection && <SubSectionModal
                addSubSection={addSubSection}
                setAddSubSection={setAddSubSection}
            />
        }
        {
            editSubSection && <SubSectionModal
                editSubSection={editSubSection}
                setEditSubSection={setEditSubSection}
            />
        }
        {
          modalData && <Modal modalData={modalData}/>
        }
        </div>
    )
  )
}

export default NestedView