import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/auth';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const email = formData.email;
  const password = formData.password;
  const [showPassword, setShowPassword] = useState(false);
  //handles change in form data keeps previous data as is,changes on the field that has been changed
  function handleChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      };
    });
  }
  function handleOnSubmit(event) {
    event.preventDefault();
    login(email, password, navigate, dispatch); //launch login service
  }
  return (
    <>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4">
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
          />
          {
            <div
              className="absolute right-3 top-[38px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword === false ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </div>
          }
          <Link to={'/forgot-password'}>
            <p className="text-blue-100 text-sm absolute right-0">Forgot Password</p>
          </Link>
        </label>
        <button
          type="submit"
          className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Sign In
        </button>
      </form>
    </>
  );
};

export default LoginForm;
