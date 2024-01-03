import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ data, imgStyle, customClasses }) => {
  return (
    <Link to={`/course_details/${data._id}`}>
      <div className={`flex flex-col p-1 gap-y-2 ${customClasses}`}>
        <img className={imgStyle} src={data.thumbnail} alt="Course Thumbnail" loading="lazy" />
        <p className="text-richblack-50 text-lg">{data.courseName}</p>
        <p className="text-richblack-25 text-md">Rs. {data.price}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
