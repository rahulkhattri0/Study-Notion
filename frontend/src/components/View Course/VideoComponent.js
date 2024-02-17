import React from 'react';
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';

const VideoComponent = ({ course }) => {
  const [searchParams] = useSearchParams();
  const sectionParam = Number(searchParams.get('section'));
  const subSectionParam = Number(searchParams.get('subSection'));
  const activeSubSection = course?.courseContent[sectionParam]?.subSection[subSectionParam];
  return (
    <div className="w-[100%] lg:w-[70%] md:w-[60%] p-4">
      {!activeSubSection ? (
        <p className="text-xl text-white">Please choose another section's video!</p>
      ) : (
        <div className="flex flex-col gap-y-4">
          <ReactPlayer url={activeSubSection.videoUrl} width="100%" controls />
          <p className="text-richblack-5 font-bold text-lg">{activeSubSection.title}</p>
          <p className="text-richblack-200 text-md">{activeSubSection.description}</p>
        </div>
      )}
    </div>
  );
};

export default VideoComponent;
