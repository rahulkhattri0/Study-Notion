import React from 'react';

const FormRow = ({ labelText, children, required = true }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <label className="label-style">
        {labelText}
        {required && <sup className="text-pink-200">*</sup>}
      </label>
      {children}
    </div>
  );
};

export default FormRow;
