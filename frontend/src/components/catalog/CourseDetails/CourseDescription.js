import React, { useState } from 'react'
import Ratings from '../Ratings'
import IconBtn from '../../common/IconBtn'
import { MdOutlineAttachMoney } from "react-icons/md";
import { buyCourse } from '../../../services/operations/payments';
import { useDispatch, useSelector } from 'react-redux';
import{ useNavigate } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa";
import Modal from '../../common/Modal'
import toast from 'react-hot-toast';

const CourseDescription = ({course}) => {
  const token = useSelector((store)=>store.auth.token)
  const user = useSelector((store)=>store.profile.user)
  const dispatch = useDispatch()
  const [modalData,setModalData] = useState(null)
  const navigate = useNavigate()
  async function handleBuy(){
      if(token){
        await buyCourse(token,[course._id],course.price,dispatch,navigate,user)
      }
      else{
        console.log("enter")
        setModalData({
          text1 : "Not Logged in!!",
          text2 : "You must be logged in to buy the course.",
          btn1Text : "Log in",
          btn2Text : "cancel",
          btn1Handler: () => {
              navigate("/login")
          },
          btn2Handler : () => {
            setModalData(null)
          }
        })
      }
  }
  return (
    <div className='p-6 border-richblack-700 bg-richblack-800 rounded-xl m-4'>
      <div className='flex flex-row gap-x-4'>
        <img src={course.thumbnail} className='object-cover h-[250px] w-[30%]' alt={`${course.courseName} thumnail`}/>
        <div className='flex flex-row w-[70%]'>
          <div className='flex flex-col justify-between sm:w-[50%] md:w-[60%] lg:w-[70%]'>
            <p className='text-white font-extrabold text-2xl'>{course.courseName}</p>
            <p className='text-lg text-richblack-25'>{course.courseDescription}</p>
            <Ratings/>
            <div className='flex flex-row gap-x-4'>
              {
                course.tags.map((tag)=><p key={tag.id} className='text-sm text-blue-100'>{`#${tag.value}`}</p>)
              }
            </div>
          </div>
          <div className='flex flex-col gap-y-4 sm:w-[50%] md:w-[40%] lg:w-[30%] justify-center'>
            {
              user.courses.includes(course._id) ? (
                <IconBtn text={'Go To Course'} onClick={()=>{}}>
                  <FaLocationArrow className='text-lg'/>
                </IconBtn>
              ) : (
                <IconBtn text={'Buy Course'} onClick={handleBuy}>
                  <MdOutlineAttachMoney className='text-lg'/>
                </IconBtn>
              )
            }
              
              <button className='bg-richblack-700 rounded-md p-1 text-richblack-5'>
                Add To Cart
              </button>
          </div>
        </div>
      </div>
      { modalData && <Modal modalData={modalData}/> }
    </div>
  )
}

export default CourseDescription