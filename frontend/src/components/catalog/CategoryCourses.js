import React, { useEffect, useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';
import CourseCard from './CourseCard';

const CategoryCourses = ({ name, courses }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let interval;
    if (courses.length > 1) {
      interval = setInterval(() => {
        handleIncrease();
      }, 6000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [index]);
  function handleIncrease() {
    let newIndex;
    if (index === courses.length - 1) newIndex = 0;
    else newIndex = index + 1;
    setIndex(newIndex);
  }
  function handleDecrease() {
    let newIndex;
    if (index === 0) newIndex = courses.length - 1;
    else newIndex = index - 1;
    setIndex(newIndex);
  }
  return (
    <>
      <div className="text-2xl font-bold mt-8 flex flex-row gap-x-2 mb-5">
        <p className="text-richblack-25">You might also like courses in</p>
        <p className="text-yellow-25">{name}</p>
      </div>
      <div className="mx-auto lg:w-[70%] md:w-[80%] w-[90%] relative">
        {courses.length > 1 && (
          <FaCaretLeft
            className="text-black text-4xl cursor-pointer bg-white rounded-r-md pr-1 hover:text-yellow-50 absolute left-1 top-1/2"
            onClick={handleDecrease}
          />
        )}
        {courses.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-richblack-50">No Courses Found !</p>
          </div>
        ) : (
          <CourseCard
            data={courses[index]}
            imgStyle={'rounded-xl lg:h-[500px] md:h-[500px] h-[250px] w-full object-cover'}
          />
        )}
        {courses.length > 1 && (
          <FaCaretRight
            className="text-black pl-1 bg-white text-4xl cursor-pointer rounded-l-md hover:text-yellow-50 absolute right-1 top-1/2"
            onClick={handleIncrease}
          />
        )}
      </div>
    </>
  );
};

export default CategoryCourses;
