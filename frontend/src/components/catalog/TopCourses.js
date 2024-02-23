import React from 'react';
import CourseCard from './CourseCard';

const TopCourses = ({ data }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-2xl text-richblack-50 mt-8">Top Selling Courses</p>
      <div className="flex lg:flex-row md:flex-row flex-col gap-x-6 gap-y-4 overflow-hidden">
        {data.length === 0 ? (
          <p className="text-richblack-100">No Courses found</p>
        ) : (
          data.map((course) => {
            return (
              <CourseCard
                key={course._id}
                data={course}
                imgStyle="rounded-md object-cover h-[200px]"
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TopCourses;
