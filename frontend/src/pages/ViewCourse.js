import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import AddRating from '../components/View Course/AddRating';
import ContentSidebar from '../components/View Course/ContentSidebar';
import VideoComponent from '../components/View Course/VideoComponent';
import Error from '../components/common/Error';
import Loader from '../components/common/Loader';
import useFetchData from '../hooks/useFetchData';
import { getAuthCourseDetails } from '../services/operations/course';

const ViewCourse = () => {
  const location = useLocation();
  const pathArr = location.pathname.split('/');
  const courseId = pathArr[pathArr.length - 1];
  const token = useSelector((store) => store.auth.token);
  const [viewData, isError, isLoading] = useFetchData(getAuthCourseDetails, false, courseId, token);
  const course = viewData?.course;
  const courseProgress = viewData?.courseProgress;
  if (isError) return <Error />;
  if (isLoading || viewData === null) return <Loader />;
  return (
    <div className="flex flex-col-reverse lg:flex-row md:flex-row gap-x-2">
      <ContentSidebar course={course} courseProgress={courseProgress} />
      <div className="w-full flex flex-col gap-y-4 p-2">
        <VideoComponent course={course} />
        <AddRating course={course} />
      </div>
    </div>
  );
};

export default ViewCourse;
