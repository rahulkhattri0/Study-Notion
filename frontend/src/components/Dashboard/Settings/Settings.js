import React from 'react';
import EditProfile from './EditProfile';
import UpdatePassword from './UpdatePassword';
import DeleteProfile from './DeleteProfile';
import UpdateProfilePic from './UpdateProfilePic';

const Settings = () => {
  return (
    <>
      <UpdateProfilePic />
      <EditProfile />
      <UpdatePassword />
      <DeleteProfile />
    </>
  );
};

export default Settings;
