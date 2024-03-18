import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { apiCaller } from '../../services/apiConnector';
import { createRating } from '../../services/operations/course';
import IconBtn from '../common/IconBtn';
import RatingStars from '../common/RatingStars';

const AddRating = ({ course }) => {
  const token = useSelector((store) => store.auth.token);
  const [rating, setRating] = useState(0);
  const { formState, handleSubmit, setValue, register, reset } = useForm();
  register('rating', { validate: (val) => val > 0 });
  const { errors } = formState;
  async function submit(formdata) {
    await apiCaller(createRating, true, course._id, token, formdata.rating, formdata.review);
    setRating(0);
    reset({
      rating: 0,
      review: ''
    });
  }
  return (
    <div className="flex flex-col gap-y-2 bg-richblack-500 p-2 rounded-lg mr-2">
      <p className="font-bold text-md text-richblack-50">Add a Review For The course</p>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-y-2">
        <div className="flex items-center gap-2">
          <RatingStars
            value={rating}
            onRatingChange={(newRating) => {
              setRating(newRating);
              setValue('rating', newRating);
            }}
            edit={true}
          />
          <p className="text-yellow-100">{rating} stars</p>
        </div>
        {errors.rating && <p className="warning-style">Please provide a rating.</p>}
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <div className="md:w-[90%]">
            <input
              type="text"
              className="form-style"
              {...register('review', { required: true })}
              placeholder="Please Enter a Review..."
            />
            {errors.review && <p className="warning-style">Please provide a reivew</p>}
          </div>
          <IconBtn type={'submit'} text={'Add'} customClasses={'md:w-[10%] md:h-10'} />
        </div>
      </form>
    </div>
  );
};

export default AddRating;
