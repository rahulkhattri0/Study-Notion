import React from 'react';
import Table from '../../common/Table';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { BsCheck2 } from 'react-icons/bs';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { FiEdit2 } from 'react-icons/fi';
import { setCourse, setEditCourse } from '../../../redux/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const InstructorCourseRow = ({ course }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
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
      <div className="flex justify-center items-center text-white">
        <FiEdit2
          className="hover:text-yellow-100 text-xl cursor-pointer"
          onClick={() => {
            dispatch(setCourse(course));
            dispatch(setEditCourse(true));
            navigate('/dashboard/edit-course');
          }}
        />
      </div>
    </Table.Row>
  );
};

export default InstructorCourseRow;
