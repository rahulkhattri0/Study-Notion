import React, { useEffect } from 'react';
import Steps from '../components/Dashboard/Add_Course/Steps';
import { useDispatch, useSelector } from 'react-redux';
import CourseCreator from '../components/Dashboard/Add_Course/main/CourseCreator';
import CourseBuilder from '../components/Dashboard/Add_Course/main/CourseBuilder';
import { resetCourse } from '../redux/slices/courseSlice';

const Course = () => {
  const step = useSelector((store) => store.course.step);
  const editCourse = useSelector((store) => store.course.editCourse);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetCourse());
    };
  }, []);
  return (
    <>
      <p className="text-2xl text-pure-greys-25 mb-2">
        {editCourse ? 'Edit Course' : 'Add Course'}
      </p>
      <Steps />
      {step === 1 && <CourseCreator />}
      {step === 2 && <CourseBuilder />}
    </>
  );
};

export default Course;
