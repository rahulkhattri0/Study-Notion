import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../components/EnrolledCourses/CourseCard';
import { getEnrolledCourses } from '../services/operations/profile';
const EnrolledCourses = () => {
  const token = useSelector((store) => store.auth.token);
  const [courses, setCourses] = useState(null);
  const [courseProgress, setCourseProgress] = useState(null);
  async function getCourses() {
    const [courses, courseProgress] = await getEnrolledCourses(token);
    if (courses && courseProgress) {
      setCourses(courses);
      setCourseProgress(courseProgress);
    }
  }
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <>
      <h1 className="text-white font-inter">Enrolled Courses</h1>
      {courses && courses.length === 0 ? (
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
