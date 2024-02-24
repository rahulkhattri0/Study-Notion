import React from 'react';

const WhatYouWillLearn = ({ data }) => {
  return (
    <div className="m-3 border-2 md:w-[68%] border-richblack-200 rounded-sm p-2">
      <p className="text-2xl text-richblack-5 mb-3">What You Will Learn</p>
      <p className="text-lg text-richblack-5">{data}</p>
    </div>
  );
};

export default WhatYouWillLearn;
