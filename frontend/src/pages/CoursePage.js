import React from 'react';
import { useLocation } from 'react-router-dom';
import CourseContent from '../components/catalog/CourseDetails/CourseContent';
import CourseDescription from '../components/catalog/CourseDetails/CourseDescription';
import Footer from '../components/catalog/CourseDetails/Footer';
import WhatYouWillLearn from '../components/catalog/CourseDetails/WhatYouWillLearn';
import Error from '../components/common/Error';
import Shimmer from '../components/common/Shimmer';
import useFetchData from '../hooks/useFetchData';
import { getCourseDetails } from '../services/operations/course';

const CoursePage = () => {
  const location = useLocation();
  const courseId = location.pathname.split('/')[2];
  const [courseData, isError, isLoading] = useFetchData(getCourseDetails, false, courseId);
  if (isError) return <Error />;
  if (isLoading || courseData === null)
    return <Shimmer number={3} flexDirection={`flex-col`} style={`p-20 m-6`} />;
  return (
    <>
      <CourseDescription course={courseData} />
      <WhatYouWillLearn data={courseData.whatYouWillLearn} />
      <CourseContent content={courseData.courseContent} requirements={courseData.instructions} />
      <Footer
        instructorName={courseData.instructor?.firstName + ' ' + courseData.instructor?.lastName}
        instructorImage={courseData.instructor?.image}
      />
    </>
  );
};

export default CoursePage;
