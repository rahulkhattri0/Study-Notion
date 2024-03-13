import React, { useState } from 'react';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCourse, setEditCourse } from '../../../redux/slices/courseSlice';
import { apiCaller } from '../../../services/apiConnector';
import { deleteCourse } from '../../../services/operations/course';
import Table from '../../common/Table';
import Modal from '../../common/Modal';

const InstructorCourseRow = ({ course, setData, courses }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const token = useSelector((store) => store.auth.token);
  async function handleDelete(courseId) {
    setLoading(true);
    await apiCaller(deleteCourse, true, courseId, token, courses, setData);
    setLoading(false);
  }

  return (
    <>
      <Table.Row>
        <div className="flex lg:flex-row md:flex-row flex-col gap-4 p-2">
          <img
            src={course.thumbnail}
            alt="course-pic"
            className="lg:w-[40%] md:w-[40%] w-[100%] h-[200px] rounded-md object-cover"
          />
          <div className="flex flex-col gap-y-6">
            <p className="text-white text-xl">{course.courseName}</p>
            <p className="text-richblack-200 text-sm">{course.courseDescription}</p>
            <div
              className={`rounded-full max-w-max flex flex-row gap-x-2 items-center px-2 ${
                course.status === 'Draft' ? 'bg-yellow-50' : 'bg-red-400'
              }`}
            >
              {course.status === 'Draft' ? <AiOutlineClockCircle /> : <BsCheck2 />}
              {course.status === 'Draft' ? (
                <p className="text-richblack-800">Draft</p>
              ) : (
                <p className="text-white">Published</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-x-1 justify-center items-center text-white">
          <LiaRupeeSignSolid className="text-xl" />
          <p>{course.price}</p>
        </div>
        <div className="flex justify-center gap-x-2 gap-y-4 flex-col md:flex-row items-center text-white cursor-pointer text-xl">
          <FiEdit2
            className="hover:text-yellow-100"
            onClick={() => {
              dispatch(setCourse(course));
              dispatch(setEditCourse(true));
              navigate('/dashboard/edit-course');
            }}
          />
          <MdDelete
            className="hover:text-red-100"
            onClick={() => {
              if (!loading)
                setModalData({
                  text1: 'Are You Sure?',
                  text2: 'This Course will be deleted',
                  btn1Text: 'Proceed',
                  btn2Text: 'Cancel',
                  btn1Handler: () => {
                    setModalData(null);
                    handleDelete(course._id);
                  },
                  btn2Handler: () => {
                    setModalData(null);
                  }
                });
            }}
          />
        </div>
      </Table.Row>
      {modalData && <Modal modalData={modalData} />}
    </>
  );
};

export default InstructorCourseRow;
