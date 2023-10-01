import React, { useEffect, useState } from 'react'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { GrAdd } from 'react-icons/gr'
import { getInstructorCourses } from '../../../services/operations/course'
import { useDispatch, useSelector } from 'react-redux'
import {AiOutlineClockCircle} from 'react-icons/ai'
import {BsCheck2} from 'react-icons/bs'
import {LiaRupeeSignSolid} from 'react-icons/lia'
import {FiEdit2} from 'react-icons/fi'
import { setCourse, setEditCourse } from '../../../redux/slices/courseSlice'
const InstructorCourses = () => {
    const [courses,setCourses] = useState([])
    const dispatch = useDispatch()
    const token = useSelector((store)=>store.auth.token)
    const navigate = useNavigate()
    async function fetchCourses(){
        const data = await getInstructorCourses(token)
        setCourses(data)
    } 
    useEffect(()=>{
        fetchCourses()
    },[])
  return (
    <div className='flex flex-col gap-y-6'>
        <div className='flex flex-row justify-between'>
            <p className='text-richblack-50 text-4xl'>My Courses</p>
            <IconBtn
                text='Add course'
                onClick={()=>navigate('/dashboard/add-course')}
            >
                <GrAdd/>
            </IconBtn>
        </div>
        {
            courses.length===0 ? (
                <p className='text-richblack-100 text-lg'>No Courses Found</p>
            ) : (
                <table className='border-2 border-pure-greys-800'>
                    
                        <tbody>
                            <tr className='text-richblack-100 text-md font-light border border-pure-greys-800'>
                                <td className='w-[70%]'>COURSES</td>
                                <td><div className='flex justify-center items-center'><p>PRICE</p></div></td>
                                <td><div className='flex justify-center items-center'><p>ACTIONS</p></div></td>
                            </tr>
                            {
                                courses.map((course)=>{
                                    return (
                                        <tr key={course._id}>
                                            <td className='flex flex-row gap-x-4 p-2'>
                                                <img src={course.thumbnail} alt='course-pic' className='w-[40%] h-[200px] rounded-md object-cover'/>
                                                <div className='flex flex-col gap-y-6'>
                                                    <p className='text-white text-xl'>{course.courseName}</p>
                                                    <p className='text-richblack-200 text-sm'>{course.courseDescription}</p>
                                                    <div className={`rounded-full max-w-max flex flex-row gap-x-2 items-center px-2 ${course.status==='Draft' ? 'bg-yellow-50' : 'bg-red-400'}`}>
                                                        {
                                                            course.status === 'Draft' ? (
                                                                <AiOutlineClockCircle/>
                                                            ) : (
                                                                <BsCheck2/>
                                                            )
                                                        }
                                                        {
                                                            course.status === 'Draft' ? (
                                                                <p className='text-richblack-800'>Draft</p>
                                                            ) : (
                                                                <p className='text-white'>Published</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className='flex gap-x-1 justify-center items-center text-white'>
                                                    <LiaRupeeSignSolid className='text-xl'/>
                                                    <p>{course.price}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <div className='flex justify-center items-center text-white'>
                                                        <FiEdit2 className='hover:text-yellow-100 text-xl cursor-pointer' onClick={()=>{
                                                            dispatch(setCourse(course))
                                                            dispatch(setEditCourse(true))
                                                            navigate('/dashboard/edit-course')
                                                        }}/>             
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }    
                        </tbody>
                </table>
            )
        }
        
    </div>
  )
}

export default InstructorCourses