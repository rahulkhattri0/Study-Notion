import React, { useState } from 'react'
import IconBtn from '../../common/IconBtn'
import { MdOutlineAttachMoney } from "react-icons/md";
import { buyCourse } from '../../../services/operations/payments';
import { useDispatch, useSelector } from 'react-redux';
import{ useNavigate } from 'react-router-dom'
import { FaLocationArrow } from "react-icons/fa";
import Modal from '../../common/Modal'
import { MdCurrencyRupee } from "react-icons/md";
import { ACCOUNT_TYPE } from '../../../utils/constants';
import toast from 'react-hot-toast';
import { addToCart } from '../../../redux/slices/cartSlice';
import { setViewCourse } from '../../../redux/slices/viewCourseSlice';

const CourseDescription = ({course}) => {
  const token = useSelector((store)=>store.auth.token)
  const user = useSelector((store)=>store.profile.user)
  const dispatch = useDispatch()
  const [modalData,setModalData] = useState(null)
  const navigate = useNavigate()
  function handleAddToCart(){
      if(token){
        if(user.accountType===ACCOUNT_TYPE.INSTRUCTOR) toast.error("Instructors cannot add courses to cart !")
        else dispatch(addToCart(course))
      }
      else{
        setModalData({
          text1 : "Not Logged in!!",
          text2 : "You must be logged in to add course to cart",
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
  async function handleBuy(){
      if(token){
        if(user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("Instructors cannot buy courses!")
        }
        else await buyCourse(token,[course._id],course.price,dispatch,navigate,user.email)
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
      <div className='flex lg:flex-row md:flex-row flex-col gap-y-4 gap-x-4'>
        <img src={course.thumbnail} className='object-cover h-[250px]' alt={`${course.courseName} thumnail`}/>
        <div className='flex lg:flex-row md:flex-row flex-col gap-4 justify-between'>
          <div className='flex flex-col justify-between'>
            <p className='text-white font-extrabold text-2xl'>{course.courseName}</p>
            <p className='text-lg text-richblack-25'>{course.courseDescription}</p>
            <div className='text-white text-xl flex flex-row gap-x-1 items-center'>
            <MdCurrencyRupee/>
            {course.price}
            </div>
            <div className='flex flex-row gap-x-4'>
              {
                course.tags.map((tag)=><p key={tag.id} className='text-sm text-blue-100'>{`#${tag.value}`}</p>)
              }
            </div>
          </div>
          <div className='flex flex-col gap-y-4 justify-center'>
            {
              user && user.courses.includes(course._id) ? (
                <IconBtn text={user.accountType===ACCOUNT_TYPE.INSTRUCTOR ? 'Go to dashboard' :'Go To Enrolled Courses'} onClick={user.accountType===ACCOUNT_TYPE.STUDENT ? ()=>navigate("/dashboard/enrolled-courses") : ()=>navigate("/dashboard/instructor")}>
                  <FaLocationArrow className='text-lg'/>
                </IconBtn>
              ) : (
                <>
                  <IconBtn text={'Buy Course'} onClick={handleBuy}>
                    <MdOutlineAttachMoney className='text-lg'/>
                  </IconBtn>         
                  <button className='bg-richblack-700 rounded-md p-1 text-richblack-5' onClick={handleAddToCart}>
                    Add To Cart
                  </button>
                </>
              )
            }
          </div>
        </div>
      </div>
      { modalData && <Modal modalData={modalData}/> }
    </div>
  )
}

export default CourseDescription