import React, { useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../data/dashboard-links';
import { logout } from '../../services/operations/auth';
import Modal from '../common/Modal';
import SidebarLink from './SidebarLink';
const Sidebar = () => {
  const user = useSelector((store) => store.profile.user);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [modal, setModal] = useState(null);
  const handleLogout = () => {
    setModal({
      text1: 'Are You Sure?',
      text2: 'You will be logged out!',
      btn1Text: 'Proceed',
      btn2Text: 'Cancel',
      btn1Handler: () => logout(dispath, navigate),
      btn2Handler: () => setModal(null)
    });
  };
  return (
    <>
      <div className="lg:flex md:flex flex-col bg-richblack-800 border-r-richblack-700 h-[calc(100vh-3.5rem)] border-r-[1px] lg:min-w-[220px] md:min-w-[200px] hidden">
        {sidebarLinks.map(
          (link) =>
            (!link.type || link.type === user.accountType) && (
              <SidebarLink data={link} key={link.id} />
            )
        )}
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <SidebarLink
          data={{
            name: 'Settings',
            path: '/dashboard/settings',
            icon: 'VscSettingsGear'
          }}
        />
        <div
          className="flex flex-row gap-x-2 cursor-pointer text-richblack-5 items-center p-2"
          onClick={handleLogout}
        >
          <VscSignOut className="text-lg" />
          <p>Logout</p>
        </div>
      </div>
      {modal !== null && <Modal modalData={modal} />}
    </>
  );
};

export default Sidebar;
