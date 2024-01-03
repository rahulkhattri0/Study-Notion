import React from 'react';
import { Link } from 'react-router-dom';

const CTAButton = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 ${
          active ? 'bg-yellow-50 text-richblack-800 text-bold' : 'bg-richblack-800'
        } hover:scale-95 transition-all duration-200 rounded-md`}
      >
        {children}
      </div>
    </Link>
  );
};

export default CTAButton;
