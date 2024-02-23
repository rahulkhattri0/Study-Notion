import React from 'react';
import LoginForm from '../components/core/auth/LoginForm';

const Login = () => {
  return (
    <div className="mx-auto flex flex-col gap-3 my-auto max-w-[450px]">
      <p className="text-richblack-5 font-bold text-2xl">Welcome Back</p>
      <p className="text-richblack-100">
        Build skills for today, tomorrow, and beyond.
        <br />
        <span className="font-edu-sa text-blue-100">Education to future-proof your career.</span>
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
