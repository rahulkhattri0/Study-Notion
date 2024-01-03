import React from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import { FaVideo } from 'react-icons/fa6';
import IconBtn from '../common/IconBtn';
import { addSubSectionToCourseProgress } from '../../services/operations/course';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone } from 'react-icons/md';

const ContentSidebar = ({
  course,
  activeSection,
  setActiveSection,
  setActiveSubSection,
  activeSubSection
}) => {
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  async function handleMarkAsCompleted(subSectionId, courseProgressId, course) {
    await addSubSectionToCourseProgress(
      {
        courseProgressId: courseProgressId,
        subSectionId: subSectionId
      },
      token,
      dispatch,
      course
    );
  }
  return (
    <div className="w-[30%] flex flex-col bg-richblack-800 border-r-richblack-700 h-[calc(100vh-3.5rem)] border-r-[1px]">
      {course.courseContent &&
        course.courseContent.map((section, index) => {
          return (
            <div key={section._id} className="p-1 flex flex-col gap-y-1">
              <div
                className="flex flex-row gap-x-2 items-center text-richblack-5 border-[1px] border-richblack-200 rounded-lg p-2 cursor-pointer"
                onClick={() => setActiveSection(index)}
              >
                {activeSection === index ? <FaAngleUp /> : <FaAngleDown />}
                <p>{section.sectionName}</p>
              </div>
              {activeSection === index && (
                <div className="flex flex-col gap-y-1">
                  {section.subSection.map((subSection) => {
                    return (
                      <div
                        key={subSection._id}
                        className={`flex lg:flex-row md:flex-row flex-col justify-between gap-4 items-center p-2
                         ${
                           activeSubSection._id === subSection._id
                             ? 'bg-yellow-100 text-richblack-700 font-bold'
                             : 'bg-richblack-500 text-richblack-25'
                         } 
                         rounded-lg cursor-pointer`}
                        onClick={() => setActiveSubSection(subSection)}
                      >
                        <div className="flex flex-row gap-x-2 items-center">
                          <FaVideo className="text-xl" />
                          <p>{subSection.title}</p>
                        </div>
                        {course.courseProgress.completedVideos.includes(subSection._id) ? (
                          <div className="flex gap-x-2 items-center text-caribbeangreen-400">
                            <MdDone className="text-md" />
                            <p className="text-md">Done</p>
                          </div>
                        ) : (
                          <IconBtn
                            text={'Mark as done'}
                            onClick={() =>
                              handleMarkAsCompleted(
                                subSection._id,
                                course.courseProgress._id,
                                course
                              )
                            }
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ContentSidebar;
