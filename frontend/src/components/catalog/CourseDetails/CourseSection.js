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
        className={`${!visible ? 'h-0' : 'h-[10px]'} transition-height ease-in-out duration-700`}
      ></div>
      {visible && (
        <div className="m-3">
          {sectionData.subSection.length === 0 ? (
            <p className="text-lg text-richblack-5">Instructor is yet to add content!</p>
          ) : (
            sectionData.subSection.map((subSection) => {
              return (
                <div className="flex flex-row gap-x-2 p-2 items-center" key={subSection._id}>
                  <IoIosVideocam className="text-richblack-5 text-xl" />
                  <p className="text-richblack-5">{subSection.title}</p>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CourseSection;
