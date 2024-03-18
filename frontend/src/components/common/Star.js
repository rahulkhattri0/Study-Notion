import React from 'react';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaRegStarHalfStroke } from 'react-icons/fa6';

const Star = ({ type, onMouseEnter, onMouseLeave, onClick }) => {
  console.log('mouse ops', onMouseEnter, onMouseLeave, onClick);
  if (type === 'Full')
    return <FaStar className="text-yellow-25" {...{ onClick, onMouseEnter, onMouseLeave }} />;
  else if (type === 'Half')
    return (
      <FaRegStarHalfStroke
        className="text-yellow-25"
        {...{ onClick, onMouseEnter, onMouseLeave }}
      />
    );
  else if (type === 'Empty')
    return <FaRegStar className="text-white" {...{ onClick, onMouseEnter, onMouseLeave }} />;
};

export default Star;
