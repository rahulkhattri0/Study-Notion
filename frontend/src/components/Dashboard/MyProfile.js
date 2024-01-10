import React from 'react';
import { useSelector } from 'react-redux';
import IconBtn from '../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { FiEdit3 } from 'react-icons/fi';
const MyProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.profile.user);
  console.log(user);
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">My Profile</h1>
      {/* section-1   */}
      <div className="flex flex-col gap-y-8">
        <div className="flex lg:flex-row md:flex-row flex-col justify-between gap-y-6 lg:items-center md:items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8">
          <div className="flex gap-x-4 items-center">
            <img
              src={user.image}
              alt={user.firstName}
              className="aspect-square md:w-[78px] lg:w-[78px] w-[40px] rounded-full object-cover"
            />
            <div className="flex flex-col gap-y-1">
              <p className="text-lg font-semibold text-richblack-5">{`${user.firstName} ${user.lastName}`}</p>
              <p className="text-sm text-richblack-300">{user.email}</p>
            </div>
          </div>
          <IconBtn text="Edit" onClick={() => navigate('/dashboard/settings')}>
            <FiEdit3 className="text-xl" />
          </IconBtn>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col gap-y-2 justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8">
          <div className="flex flex-col gap-y-2">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <p
              className={`${
                user.additionalDetails.about !== null ? 'text-richblack-5' : 'text-richblack-400'
              } font-sm font-medium`}
            >
              {user.additionalDetails.about !== null
                ? user.additionalDetails.about
                : 'Write Something here'}
            </p>
          </div>
        </div>
        <div className="flex lg:flex-row md:flex-row flex-col justify-between gap-y-6 lg:items-center md:items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8">
          <div className="flex flex-col gap-y-4">
            <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
            <div className="flex  lg:flex-row md:flex-row flex-col justify-between gap-x-8 lg:w-[500px] md:w-[400px] w-[200px]">
              <div className="flex flex-col gap-y-3 mb-3">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">First Name</p>
                  <p className="text-sm font-medium text-richblack-5">{user.firstName}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Email</p>
                  <p className="text-sm font-medium text-richblack-5">{user.email}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Gender</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user.additionalDetails.gender ? user.additionalDetails.gender : 'Add gender'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Last Name</p>
                  <p className="text-sm font-medium text-richblack-5">{user.lastName}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user.additionalDetails.contactNumber
                      ? user.additionalDetails.contactNumber
                      : 'Add Phone Number'}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-sm text-richblack-600">Date of Birth</p>
                  <p className="text-sm font-medium text-richblack-5">
                    {user.additionalDetails.dateOfBirth
                      ? user.additionalDetails.dateOfBirth
                      : 'Add Date of Birth'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <IconBtn text="Edit" onClick={() => navigate('/dashboard/settings')}>
            <FiEdit3 className="text-xl" />
          </IconBtn>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
