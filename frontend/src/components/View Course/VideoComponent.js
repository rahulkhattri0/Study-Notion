import React from 'react';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';
import { ConditionalRenderer } from '../common/ConditionalRenderer';
import { MdOutlineNavigateNext } from "react-icons/md";

const VideoComponent = ({ course }) => {
  const [searchParams,setSearchParams] = useSearchParams();
  const sectionParam = Number(searchParams.get('section'));
  const subSectionParam = Number(searchParams.get('subSection'));
  const activeSubSection = course?.courseContent[sectionParam]?.subSection[subSectionParam];
  const subSectionCondition = subSectionParam + 1 < course.courseContent[sectionParam].subSection.length
  const sectionCondition = sectionParam + 1 < course.courseContent.length
  function handleChange(section,subSection){
    setSearchParams({section,subSection})
  }
  return (
    <div>
      {!activeSubSection ? (
        <p className="text-xl text-white">Please choose another section's video!</p>
      ) : (
        <div className="flex flex-col gap-y-4">
          <ReactPlayer url={activeSubSection.videoUrl} width="100%" controls />
          <p className="text-richblack-5 font-bold text-lg">{activeSubSection.title}</p>
          <p className="text-richblack-200 text-md">{activeSubSection.description}</p>
          <div className='flex flex-row gap-x-2 justify-end mr-4 hover:text-yellow-100 items-center text-white cursor-pointer'>
            <ConditionalRenderer isVisible={subSectionCondition || sectionCondition}>
              <ConditionalRenderer isVisible={subSectionCondition}>
                  <p onClick={()=>handleChange(sectionParam,subSectionParam+1)}>Next</p>
              </ConditionalRenderer>
              <ConditionalRenderer isVisible={!subSectionCondition && sectionCondition}>
                  <p onClick={()=>handleChange(sectionParam+1,0)}>Next Section</p>
              </ConditionalRenderer>
              <MdOutlineNavigateNext className='text-xl'/>
            </ConditionalRenderer>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
