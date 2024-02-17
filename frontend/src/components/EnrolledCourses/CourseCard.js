import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course, courseProgressValue }) => {
  return (
    <div className="flex lg:flex-row md:flex-row flex-col items-center gap-y-2 justify-between p-4 border-richblack-700 bg-richblack-800 border-[1px]">
      <Link to={`/view-course/${course._id}?section=0&subSection=0`}>
        <div className="flex flex-col lg:flex-row md:flex-row gap-4 items-center rounded-md text-richblack-5 cursor-pointer">
          <img
            src={course.thumbnail}
            alt={course.courseName}
            loading="lazy"
            className="object-cover md:w-[78px] w-[250px] lg:w-[78px]"
          />
          <div className="flex flex-col gap-y-2">
            <p className="text-richblack-25 text-xl font-bold">{course.courseName}</p>
            <p className="text-richblack-25 text-sm italic">{course.courseDescription}</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2">
        <p className="text-richblack-5 text-lg">Progress</p>
        <progress max={100} value={courseProgressValue} />
      </div>
    </div>
  );
};

export default CourseCard;
