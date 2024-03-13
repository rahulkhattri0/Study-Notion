import React, { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
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
    <div className="flex flex-col gap-4">
      <p className="text-richblack-25 text-2xl mt-8 font-bold">
        You might also like courses in <span className="text-yellow-25">{name}</span>
      </p>
      <div className="grid grid-cols-[1fr_7fr_1fr]">
        {courses.length > 1 ? (
          <div className="flex justify-center items-center">
            <FaAngleLeft
              className="text-richblack-300 text-4xl hover:animate-pulse cursor-pointer rounded-r-md pr-1 hover:text-yellow-50"
              onClick={handleDecrease}
            />
          </div>
        ) : (
          <div></div>
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
        {courses.length > 1 ? (
          <div className="flex justify-center items-center">
            <FaAngleRight
              className="text-richblack-300 text-4xl hover:animate-pulse cursor-pointer rounded-r-md pr-1 hover:text-yellow-50"
              onClick={handleDecrease}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CategoryCourses;
