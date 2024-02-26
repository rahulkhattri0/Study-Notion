import React, { useState } from 'react';
import { FaAngleDown, FaVideo } from 'react-icons/fa6';
import { MdDone } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addSubSectionToCourseProgress } from '../../services/operations/course';
import IconBtn from '../common/IconBtn';

const ContentSidebar = ({ course, courseProgress }) => {
  const token = useSelector((store) => store.auth.token);
  const [activeSection, setActiveSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [completedVideos, setCompletedVideos] = useState(courseProgress.completedVideos);
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionParam = Number(searchParams.get('section'));
  const subSectionParam = Number(searchParams.get('subSection'));
  async function handleMarkAsCompleted(subSectionId, courseProgressId) {
    setLoading(true);
    await addSubSectionToCourseProgress(
      {
        courseProgressId: courseProgressId,
        subSectionId: subSectionId
      },
      token,
      setCompletedVideos,
      subSectionId,
      completedVideos
    );
    setLoading(false);
  }
  return (
    <div className="w-[100%] lg:w-[30%] md:w-[40%] flex flex-col p-2 md:bg-richblack-800 md:border-r-richblack-700 max-h-max lg:h-[100vh] md:h-[100vh] border-r-[1px]">
      {course.courseContent &&
        course.courseContent.map((section, sectionIndex) => {
          return (
            <div key={section._id} className="p-1 flex flex-col gap-y-1">
              <div
                className="flex flex-row gap-x-2 items-center text-richblack-5 border-[1px] border-richblack-200 rounded-lg p-2 cursor-pointer"
                onClick={() => setActiveSection(sectionIndex)}
              >
                {/* {activeSection === sectionIndex ? <FaAngleUp /> : <FaAngleDown />} */}
                <FaAngleDown className={`${activeSection === sectionIndex ? 'rotate-180' : ''} transition-transform duration-200`}/>
                <p>{section.sectionName}</p>
              </div>
              {activeSection === sectionIndex && (
                <div className="flex flex-col gap-y-1">
                  {section.subSection.length === 0 ? (
                    <p className="text-md text-white p-1">Instructor is yet to add videos!</p>
                  ) : (
                    section.subSection.map((subSection, subSectionIndex) => {
                      return (
                        <div
                          key={subSection._id}
                          className={`flex flex-row justify-between items-center p-2
                         ${
                           sectionParam === sectionIndex && subSectionParam === subSectionIndex
                             ? 'bg-yellow-100 text-richblack-700 font-bold'
                             : 'bg-richblack-500 text-richblack-25'
                         } 
                         rounded-lg cursor-pointer`}
                          onClick={() => {
                            setSearchParams({ section: sectionIndex, subSection: subSectionIndex });
                          }}
                        >
                          <div className="flex flex-row gap-x-2 items-center">
                            <FaVideo className="text-xl" />
                            <p>{subSection.title}</p>
                          </div>
                          {completedVideos.includes(subSection._id) ? (
                            <div className="flex gap-x-2 items-center text-caribbeangreen-400">
                              <MdDone className="text-md" />
                              <p className="text-md">Done</p>
                            </div>
                          ) : (
                            <IconBtn
                              text={'Mark as done'}
                              disabled={loading}
                              onClick={() =>
                                handleMarkAsCompleted(subSection._id, courseProgress._id)
                              }
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ContentSidebar;
