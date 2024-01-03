import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetViewCourse } from '../redux/slices/viewCourseSlice';
import ContentSidebar from '../components/View Course/ContentSidebar';
import VideoComponent from '../components/View Course/VideoComponent';

const ViewCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewData = useSelector((store) => store.viewCourse);
  const [activeSubSection, setActiveSubSection] = useState(
    viewData.courseContent ? viewData.courseContent[0].subSection[0] : null
  );
  const [activeSection, setActiveSection] = useState(0);
  useEffect(() => {
    if (!viewData.courseContent) {
      navigate('/dashboard/enrolled-courses');
    }
    return () => {
      dispatch(resetViewCourse());
    };
  }, []);
  return (
    <div className="flex flex-row">
      <ContentSidebar
        course={viewData}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setActiveSubSection={setActiveSubSection}
        activeSubSection={activeSubSection}
      />
      <VideoComponent activeSubSection={activeSubSection} />
    </div>
  );
};

export default ViewCourse;
