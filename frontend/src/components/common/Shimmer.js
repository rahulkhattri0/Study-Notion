import React from 'react';
import Loader from './Loader';

const Shimmer = ({ flexDirection, style, number }) => {
  return (
    <div className={`flex ${flexDirection} flex-wrap justify-center relative`}>
      {Array(number)
        .fill('')
        .map((element, index) => (
          <div
            key={index}
            className={`${style} rounded-md shadow-lg animate-pulse flex items-center justify-center bg-pure-greys-500`}
          >
            <Loader />
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
