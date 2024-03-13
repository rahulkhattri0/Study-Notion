import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ data, imgStyle, customClasses }) => {
  const [hideText, setHideText] = useState(true);
  const descriptionSubString = data.courseDescription.substring(0, 10);
  const navigate = useNavigate();
  return (
    <div className={`flex flex-col p-1 gap-y-2 ${customClasses}`}>
      <img
        className={`${imgStyle} cursor-pointer`}
        src={data.thumbnail}
        alt="Course Thumbnail"
        loading="lazy"
        onClick={() => navigate(`/course_details/${data._id}`)}
      />
      <p className="text-richblack-50 text-lg">{data.courseName}</p>
      <p className="text-sm italic text-richblack-50">
        {hideText ? descriptionSubString : data.courseDescription}
        {descriptionSubString !== data.courseDescription && (
          <span className="cursor-pointer text-blue-50" onClick={() => setHideText(!hideText)}>
            ...{hideText ? 'show more' : 'show less'}
          </span>
        )}
      </p>
      <p className="text-richblack-25 text-md">Rs. {data.price}</p>
    </div>
  );
};

export default CourseCard;
