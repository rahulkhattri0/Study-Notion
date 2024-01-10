import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';

const Error = () => {
  return (
    <div className="flex flex-row gap-x-2 justify-center items-center text-2xl text-red-100">
      <p>Error!</p>
      <RiErrorWarningFill />
    </div>
  );
};

export default Error;
