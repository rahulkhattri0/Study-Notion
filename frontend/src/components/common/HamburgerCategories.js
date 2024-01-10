import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
const HamburgerCategories = ({ setOpen }) => {
  const [showCategories, setShowCategories] = useState(false);
  const categories = useSelector((store) => store.category.categories);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center cursor-pointer border-black border-b-2"
        onClick={() => setShowCategories(!showCategories)}
      >
        <p>Categories</p>
        <RiArrowDropDownLine className="text-4xl" />
      </div>
      <div className="flex flex-col gap-y-2">
        {showCategories &&
          categories.map((category) => (
            <p
              className="cursor-pointer"
              key={category._id}
              onClick={() => {
                setOpen(false);
                navigate(`/catalog/${category._id}`);
              }}
            >
              {category.name}
            </p>
          ))}
      </div>
    </div>
  );
};

export default HamburgerCategories;
