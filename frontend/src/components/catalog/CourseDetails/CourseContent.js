import React from 'react';
import CourseSection from './CourseSection';

const CourseContent = ({ content, requirements }) => {
  return (
    <>
      <p className="text-yellow-100 mb-2 text-2xl m-4 font-bold">Course content</p>
      <div className="flex flex-col m-4 gap-x-6 gap-y-6 md:w-[68%]">
        <div>
          {content.length === 0 ? (
            <p className="text-richblack-5">No content yet!</p>
          ) : (
            content.map((section) => {
              return <CourseSection sectionData={section} key={section._id} />;
            })
          )}
        </div>
        <div>
          <p className="text-2xl text-richblack-5 mb-4">Requirements for the course</p>
          <ul className="list-disc ml-2">
            {requirements.map((requirement) => (
              <li className="text-richblack-50" key={requirement.id}>
                {requirement.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CourseContent;
