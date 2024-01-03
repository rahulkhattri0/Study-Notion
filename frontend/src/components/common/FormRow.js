import React from 'react';

const FormRow = ({ labelText, children }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="label-style" htmlFor="courseName">
        {labelText}
        <sup className="text-pink-200">*</sup>
      </label>
      {children}
    </div>
  );
};

export default FormRow;
