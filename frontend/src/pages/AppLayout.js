import React from 'react';
import Navbar from '../components/common/Navbar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
