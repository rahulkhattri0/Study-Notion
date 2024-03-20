import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { contact } from '../../services/operations/contact';
const ContactForm = () => {
  const form = useForm();
  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitSuccessful } = formState;
  //better to reset the form whenever it is submitted successfully
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        firstName: '',
        lastName: '',
        message: '',
        phoneNo: ''
      });
    }
  }, [reset, isSubmitSuccessful]);
  console.log('render', isSubmitSuccessful);
  const formSubmit = async (data) => {
    const { firstName, lastName, email, message } = data;
    await contact(firstName, lastName, email, message);
  };
  return (
    <>
      <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(formSubmit)}>
        <div className="flex gap-x-2">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
              placeholder="Enter First Name"
              type="text"
              {...register('firstName', { required: true })}
            />
            {errors.firstName && <p className="text-yellow-25">Please enter name</p>}
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</p>
            <input
              className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
              placeholder="Enter Last Name"
              type="text"
              {...register('lastName')}
            />
          </label>
        </div>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email <sup className="text-pink-200">*</sup>
          </p>
          <input
            className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
            placeholder="Enter email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-yellow-25">Please enter email</p>}
        </label>
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Message <sup className="text-pink-200">*</sup>
          </p>
          <textarea
            cols="30"
            rows="7"
            placeholder="Enter message here"
            className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
            {...register('message', { required: true })}
          />
          {errors.message && <p className="text-yellow-25">Please enter message</p>}
        </label>
        <button
          type="submit"
          className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Send message
        </button>
      </form>
    </>
  );
};

export default ContactForm;
