import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from 'react-icons/io';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { logout } from '../../services/operations/auth';
import { Link, useNavigate } from 'react-router-dom';
const ProfileDropdown = () => {
  const user = useSelector((store) => store.profile.user);
  const dropDownRef = useRef();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const callback = (event) => {
      if (!dropDownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('click', callback);
    }
    return () => document.removeEventListener('click', callback);
  }, [open]);
  return (
    <div className="relative" ref={dropDownRef}>
      <div
        className="text-richblack-25 flex flex-row gap-x-1 items-center"
        onClick={() => setOpen((prev) => !prev)}
      >
        <img
          src={user.image}
          alt={`image of ${user.firstname}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <IoMdArrowDropdown />
      </div>
      {open === true && (
        <div className="absolute top-12 right-1 z-[1000] flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 gap-y-2 cursor-pointer">
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="p-2 gap-x-1 rounded-md flex items-center text-richblack-100  hover:bg-richblack-700 hover:text-richblack-25 m-3">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            className="p-2 gap-x-1 rounded-md flex items-center text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25 m-3"
            onClick={() => {
              logout(dispatch, navigate);
              setOpen(false);
            }}
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
