import React from 'react';
import * as Icons from 'react-icons/vsc';
import { NavLink } from 'react-router-dom';
const SidebarLink = ({ data }) => {
  const Icon = Icons[data.icon];
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? 'bg-yellow-800 text-yellow-100 border-l-4 border-yellow-200' : 'text-richblack-5'
      }
      to={data.path}
    >
      <div className="flex gap-x-2 p-2 items-center">
        <Icon />
        <p>{data.name}</p>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
