import React from 'react';
import ReactPlayer from 'react-player';

const VideoComponent = ({ activeSubSection }) => {
  return (
    <div className="w-[70%] p-4">
      {activeSubSection && (
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
