import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { IoIosVideocam } from 'react-icons/io';
const CourseSection = ({ sectionData }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col border-2 border-richblack-100 rounded-lg mb-3">
      <div className="bg-richblack-600 p-2 rounded-lg flex flex-row justify-between items-center">
        <div
          className="flex flex-row gap-x-2 items-center cursor-pointer m-3"
          onClick={() => setVisible((prev) => !prev)}
        >
          {!visible ? (
            <FaAngleDown className="text-lg text-richblack-5" />
          ) : (
            <FaAngleUp className="text-lg text-richblack-5" />
          )}
          <p className="text-richblack-5 text-lg font-bold">{sectionData.sectionName}</p>
        </div>
        <p className="text-yellow-50 text-lg">{sectionData.subSection.length} lecture(s)</p>
      </div>
      <div
        className={`${
          visible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        } grid transition-all ease-in-out duration-500`}
      >
        <div className="overflow-hidden">
          {sectionData.subSection.length === 0 ? (
            <p className="text-lg text-richblack-5 p-2">Instructor is yet to add content!</p>
          ) : (
            sectionData.subSection.map((subSection) => {
              return (
                <div className="overflow-hidden" key={subSection._id}>
                  <div className="flex flex-row gap-x-2 p-2 items-center" key={subSection._id}>
                    <IoIosVideocam className="text-richblack-5 text-xl" />
                    <p className="text-richblack-5">{subSection.title}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
