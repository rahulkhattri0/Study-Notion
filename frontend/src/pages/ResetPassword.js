import React, { useState } from 'react';
import { resetPasswordToken } from '../services/operations/auth';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

//reset password token and chack your email ke liye do pages separate banane se acha hai ek hi page main karlo,
//using conditional rendering
const ResetPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  function handleSubmit(event) {
    event.preventDefault();
    resetPasswordToken(email, setEmailSent);
  }
  function handleChange(event) {
    setEmail(event.target.value);
  }
  return (
    <div className="mx-auto flex flex-col gap-3 my-auto max-w-[450px]">
      {!emailSent ? (
        <p className="text-richblack-5 font-bold text-2xl">Reset Your Password</p>
      ) : (
        <p className="text-richblack-5 font-bold text-2xl">Check Email</p>
      )}
      {!emailSent ? (
        <p className="text-md text-richblack-100 font-inter">
          Have no fear. We'll email you instructions to reset your password. If you dont have access
          to your email we can try account recovery
        </p>
      ) : (
        <p className="text-md text-richblack-100 font-inter">
          We have sent the reset email to {email}
        </p>
      )}
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
        {!emailSent && (
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Email <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        )}
        <button
          type="submit"
          className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          {!emailSent ? 'Submit' : 'Resend Email'}
        </button>
      </form>
      <div className="flex gap-x-1 text-white items-center">
        <BsArrowLeft />
        <Link to={'/login'}>Back to Login</Link>
      </div>
    </div>
  );
};

export default ResetPassword;
