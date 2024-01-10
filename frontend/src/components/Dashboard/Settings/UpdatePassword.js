import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import IconBtn from '../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../services/operations/settings';
import { useSelector } from 'react-redux';
import { apiCaller } from '../../../services/apiConnector';
const UpdatePassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const token = useSelector((store) => store.auth.token);
  function handlePasswordChangeSubmit(data) {
    console.log(data);
    apiCaller({ data, token }, changePassword);
  }
  return (
    <>
      <form onSubmit={handleSubmit(handlePasswordChangeSubmit)}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Change Password</h2>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="currentPassword"
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              >
                Current Password
              </label>
              <input
                className="form-style"
                placeholder="enter current password"
                name="currentPassword"
                id="currentPassword"
                {...register('oldPassword', {
                  required: {
                    value: true,
                    message: 'please enter the current password'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
              />
              <div
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </div>
              {errors.oldPassword && (
                <span className="mt-1 text-[12px] text-yellow-100">
                  {errors.oldPassword.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-y-2 relative">
              <label
                htmlFor="newPassword"
                className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5"
              >
                New Password
              </label>
              <input
                className="form-style"
                placeholder="enter new password"
                name="newPassword"
                id="newPassword"
                {...register('newPassword', {
                  required: {
                    value: true,
                    message: 'please enter the new password'
                  }
                })}
                type={showNewPassword ? 'text' : 'password'}
              />
              <div
                className="absolute right-3 top-[45px] z-[10] cursor-pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </div>
              {errors.newPassword && (
                <span className="mt-1 text-[12px] text-yellow-100">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-x-3">
          <button
            onClick={() => {
              navigate('/dashboard/my-profile');
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="change" />
        </div>
      </form>
    </>
  );
};

export default UpdatePassword;
