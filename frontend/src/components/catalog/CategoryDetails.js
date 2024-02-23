import React from 'react';

const CategoryDetails = ({ name, description }) => {
  return (
    <div className="bg-richblack-700 h-[200px] flex items-center justify-start">
      <div className="flex flex-col gap-y-2 ml-10 p-2">
        <p className="text-richblack-50">
          Home/Catalog/<span className="text-yellow-50 ">/{name}</span>
        </p>
        <p className="text-richblack-25 text-4xl">{name}</p>
        <p className="text-richblack-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CategoryDetails;
