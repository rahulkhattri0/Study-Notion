import React from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../components/EnrolledCourses/CourseCard';
import { getEnrolledCourses } from '../services/operations/profile';
import useFetchData from '../hooks/useFetchData';
import Shimmer from '../components/common/Shimmer';
import Error from '../components/common/Error';
const EnrolledCourses = () => {
  const token = useSelector((store) => store.auth.token);
  const [courses, isError, isLoading] = useFetchData(getEnrolledCourses,null,false,token);
  if (isError) {
    return <Error />;
  }
  if (isLoading || courses === null) {
    return <Shimmer number={5} style={`p-20 m-4`} flexDirection={`flex-col`} />;
  }
  return (
    <>
      <h1 className="text-white font-inter mb-2 text-2xl">Enrolled Courses</h1>
      {courses.length === 0 ? (
        <h1 className="text-white">You have not enrolled in any courses</h1>
      ) : (
        courses.map((course) => (
          <CourseCard courseProgressValue={course.progress} course={course.data} key={course._id} />
        ))
      )}
    </>
  );
};

export default EnrolledCourses;
