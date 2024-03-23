import React, { useEffect } from 'react';
import Course from './Course';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditCourse = () => {
  const course = useSelector((store) => store.course.course);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(course);
    if (Object.keys(course).length === 0) {
      navigate('/dashboard/my-profile');
    }
  }, [course, navigate]);
  return (
    <>
      <Course />
    </>
  );
};

export default EditCourse;
