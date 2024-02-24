import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaLocationArrow } from 'react-icons/fa';
import { MdCurrencyRupee, MdOutlineAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../redux/slices/cartSlice';
import { buyCourse } from '../../../services/operations/payments';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import IconBtn from '../../common/IconBtn';
import Modal from '../../common/Modal';

const CourseDescription = ({ course }) => {
  const token = useSelector((store) => store.auth.token);
  const user = useSelector((store) => store.profile.user);
  const dispatch = useDispatch();
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();
  function handleAddToCart() {
    if (token) {
      if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR)
        toast.error('Instructors cannot add courses to cart !');
      else dispatch(addToCart(course));
    } else {
      setModalData({
        text1: 'Not Logged in!!',
        text2: 'You must be logged in to add course to cart',
        btn1Text: 'Log in',
        btn2Text: 'cancel',
        btn1Handler: () => {
          navigate('/login');
        },
        btn2Handler: () => {
          setModalData(null);
        }
      });
    }
  }
  async function handleBuy() {
    if (token) {
      if (user.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
        toast.error('Instructors cannot buy courses!');
      } else await buyCourse(token, [course._id], course.price, dispatch, navigate, user.email);
    } else {
      console.log('enter');
      setModalData({
        text1: 'Not Logged in!!',
        text2: 'You must be logged in to buy the course.',
        btn1Text: 'Log in',
        btn2Text: 'cancel',
        btn1Handler: () => {
          navigate('/login');
        },
        btn2Handler: () => {
          setModalData(null);
        }
      });
    }
  }
  return (
    <div className="p-6 border-richblack-700 bg-richblack-800 rounded-xl m-4 relative">
      <div className="md:flex flex-col gap-4 h-[10rem] justify-between hidden">
        <p className="text-2xl font-extrabold text-richblack-5">{course.courseName}</p>
        <p className="text-lg text-richblack-50">
          {course.studentsEnrolled.length} students enrolled
        </p>
        <div className="flex flex-row gap-x-4">
          {course.tags.map((tag) => (
            <p key={tag.id} className="text-sm text-blue-100">{`#${tag.value}`}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 gap-x-4 justify-between md:absolute md:right-0 md:top-2 md:bg-richblack-700 md:rounded-lg md:p-4 md:w-[30%]">
        <div className="flex flex-col gap-4 justify-between">
          <img
            src={course.thumbnail}
            className="object-cover h-[250px]"
            alt={`${course.courseName} thumnail`}
          />
          <div className="flex flex-col justify-between">
            <p className="text-white font-extrabold text-2xl md:hidden">{course.courseName}</p>
            <p className="text-lg text-richblack-25">{course.courseDescription}</p>
            <div className="text-white text-xl flex flex-row gap-x-1 items-center">
              <MdCurrencyRupee />
              {course.price}
            </div>
            <div className="flex md:hidden flex-row gap-x-4">
              {course.tags.map((tag) => (
                <p key={tag.id} className="text-sm text-blue-100">{`#${tag.value}`}</p>
              ))}
            </div>
            <p className="text-richblack-50 md:hidden">{course.studentsEnrolled.length} students</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4 justify-center">
          {user && user.courses.includes(course._id) ? (
            <IconBtn
              text={
                user.accountType === ACCOUNT_TYPE.INSTRUCTOR ? 'Go to dashboard' : 'Go To Course'
              }
              onClick={
                user.accountType === ACCOUNT_TYPE.STUDENT
                  ? () => navigate(`/view-course/${course._id}?section=0&subSection=0`)
                  : () => navigate('/dashboard/instructor')
              }
            >
              <FaLocationArrow className="text-lg" />
            </IconBtn>
          ) : (
            <>
              <IconBtn text={'Buy Course'} onClick={handleBuy}>
                <MdOutlineAttachMoney className="text-lg" />
              </IconBtn>
              <button
                className="bg-richblack-500 rounded-md p-1 text-richblack-5"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            </>
          )}
        </div>
      </div>
      {modalData && <Modal modalData={modalData} />}
    </div>
  );
};

export default CourseDescription;
