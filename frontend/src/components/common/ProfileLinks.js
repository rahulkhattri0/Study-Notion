import React, { useState } from 'react';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { sidebarLinks } from '../../data/dashboard-links';
import { Link } from 'react-router-dom';
const ProfileLinks = ({ setOpen }) => {
  const [show, setShow] = useState(false);
  const user = useSelector((store) => store.profile.user);
  return (
    <div className="flex flex-col gap-y-2">
      <div
        className="flex flex-row gap-x-2 items-center cursor-pointer border-b-2 border-black"
        onClick={() => setShow((prev) => !prev)}
      >
        <p>My Profile</p>
        <RiArrowDropDownLine className="text-4xl" />
      </div>
      {show &&
        sidebarLinks.map(
          (link) =>
            (!link.type || link.type === user.accountType) && (
              <Link to={link.path} key={link.id} onClick={() => setOpen(false)}>
                <p>{link.name}</p>
              </Link>
            )
        )}
    </div>
  );
};

export default ProfileLinks;
