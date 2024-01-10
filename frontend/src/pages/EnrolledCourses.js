import React from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../components/EnrolledCourses/CourseCard';
import { getEnrolledCourses } from '../services/operations/profile';
import useFetchData from '../hooks/useFetchData';
import Shimmer from '../components/common/Shimmer';
import Error from '../components/common/Error';
const EnrolledCourses = () => {
  const token = useSelector((store) => store.auth.token);
  const [data, isError, isLoading] = useFetchData(getEnrolledCourses, { token });
  let courses;
  let courseProgress;
  if (data) {
    courses = data.courses;
    courseProgress = data.courseProgress;
  }
  if (isLoading) {
    return <Shimmer number={5} style={`p-20 m-4`} flexDirection={`flex-col`} />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <>
      <h1 className="text-white font-inter mb-2 text-2xl">Enrolled Courses</h1>
      {courses.length === 0 ? (
        <h1 className="text-white">You have not enrolled in any courses</h1>
      ) : (
        courses.map((course, index) => (
          <CourseCard
            courseProgressValue={courseProgress.values[index]}
            course={course}
            key={course._id}
            courseProgress={courseProgress.courseProgress[index]}
            index={index}
          />
        ))
      )}
    </>
  );
};

export default EnrolledCourses;
