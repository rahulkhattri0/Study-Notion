import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import TagInput from '../TagInput';
import { useDispatch, useSelector } from 'react-redux';
import Requirements from '../Requirements';
import IconBtn from '../../../common/IconBtn';
import { BiAddToQueue } from 'react-icons/bi';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { createCourse } from '../../../../services/operations/course';
import { setCourse, setStep } from '../../../../redux/slices/courseSlice';
import { editCourseInformation } from '../../../../services/operations/course';
import toast from 'react-hot-toast';
import FormRow from '../../../common/FormRow';
const CourseCreator = () => {
  const course = useSelector((store) => store.course.course);
  const user = useSelector((store) => store.profile.user);
  const [imageURL, setImageURL] = useState(course.thumbnail);
  const initialFormData = useRef({});
  const [loading, setLoading] = useState(false);
  const editCourse = useSelector((store) => store.course.editCourse);
  const { handleSubmit, register, formState, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const categories = useSelector((store) => store.category.categories);
  const { errors } = formState;
  register('thumbnail', { required: true });
  useEffect(() => {
    if (editCourse) {
      setValue('courseName', course.courseName);
      setValue('courseDescription', course.courseDescription);
      setValue('price', course.price);
      setValue('category', course.category[0]);
      setValue('whatYouWillLearn', course.whatYouWillLearn);
      setValue('thumbnail', course.thumbnail);
      //tags and instructions would have already set by their respective components,can set here again,but it will be a no-op
      initialFormData.current = getValues();
    } else {
      setValue('courseName', '');
      setValue('courseDescription', '');
      setValue('price', '');
      setValue('category', '');
      setValue('whatYouWillLearn', '');
      setValue('thumbnail', null);
      setImageURL(null);
    }
  }, [editCourse]);

  async function courseFormSubmit(data) {
    console.log(data);
    const formdata = new FormData();
    formdata.append('courseName', data.courseName);
    formdata.append('courseDescription', data.courseDescription);
    formdata.append('whatYouWillLearn', data.whatYouWillLearn);
    formdata.append('price', data.price);
    formdata.append('category', data.category);
    formdata.append('tags', JSON.stringify(data.tags));
    formdata.append('instructions', JSON.stringify(data.instructions));
    formdata.append('thumbnail', data.thumbnail);
    if (editCourse) {
      console.log('Faarm', initialFormData);
      if (JSON.stringify(data) === JSON.stringify(initialFormData.current)) {
        toast.error('No changes made');
        return;
      } else {
        formdata.append('courseId', course._id);
        setLoading(true);
        const updatedContent = await editCourseInformation(formdata, token);
        if (updatedContent) {
          dispatch(setCourse(updatedContent));
          dispatch(setStep(2));
        }
        setLoading(false);
      }
    } else {
      setLoading(true);
      await createCourse(formdata, token, dispatch, user);
      setLoading(false);
    }
  }
  function handleThumbnailChange(event) {
    const imageFile = event.target.files[0];
    const Url = URL.createObjectURL(imageFile);
    console.log(Url);
    setValue('thumbnail', imageFile);
    setImageURL(Url);
  }
  return (
    <>
      <div className="flex gap-x-4 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <form className="w-full" onSubmit={handleSubmit(courseFormSubmit)}>
          <div className="flex flex-col p-2 gap-y-5">
            <FormRow labelText={'Course Name'}>
              <input
                id="courseName"
                name="courseName"
                className="form-style"
                type="text"
                {...register('courseName', { required: true })}
                placeholder="Enter Course Name..."
              />
              {errors.courseName && <p className="warning-style">Please Enter Course Name</p>}
            </FormRow>
            <FormRow labelText={'Course Description'}>
              <textarea
                cols="30"
                rows="7"
                id="courseDescription"
                name="courseDescription"
                className="form-style"
                type="text"
                {...register('courseDescription', { required: true })}
                placeholder="Enter course Description"
              />
              {errors.courseDescription && (
                <p className="warning-style">Please Enter a short Description of the course</p>
              )}
            </FormRow>
            <FormRow labelText={'Benefits of The Course'}>
              <textarea
                cols="30"
                rows="5"
                id="whatYouWillLearn"
                name="whatYouWillLearn"
                className="form-style"
                type="text"
                {...register('whatYouWillLearn', { required: true })}
                placeholder="Enter Benefits of the course..."
              />
              {errors.whatYouWillLearn && (
                <p className="warning-style">Please Enter Benefits of taking the course</p>
              )}
            </FormRow>
            <FormRow labelText={'Price'}>
              <div className="relative form-style">
                <HiOutlineCurrencyRupee className="text-richblack-200 top-2  left-2 absolute text-3xl" />
                <input
                  type="number"
                  className="ml-8 bg-richblack-700 focus:outline-none"
                  id="price"
                  name="price"
                  {...register('price', {
                    required: {
                      value: true,
                      message: 'Please enter the price'
                    },
                    min: {
                      value: 0,
                      message: 'Please enter a positive value'
                    }
                  })}
                  placeholder="Enter Price"
                />
              </div>
              {errors.price && <p className="warning-style">{errors.price.message}</p>}
            </FormRow>
            <FormRow labelText={'Category'}>
              <select
                className="form-style"
                id="category"
                name="category"
                {...register('category', {
                  validate: (category) => {
                    return category.length > 0;
                  }
                })}
              >
                <option value="" disabled>
                  {' '}
                  Select a cateogry{' '}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="warning-style">Please Select a category</p>}
            </FormRow>
            <TagInput register={register} setValue={setValue} errors={errors} />
            <FormRow labelText={'Thumbnail'}>
              {imageURL ? (
                <div className="flex flex-col gap-y-2">
                  <img
                    src={imageURL}
                    alt="thumbnail"
                    className="w-full rounded-md md:h-[500px] h-[250px] object-cover"
                  />
                  <p
                    className="text-richblack-300 cursor-pointer"
                    onClick={() => {
                      setValue('thumbnail', null);
                      setImageURL(null);
                    }}
                  >
                    Cancel
                  </p>
                </div>
              ) : (
                <input
                  type="file"
                  name="thumbnail"
                  id="thumbnail"
                  accept="image/png, image/gif, image/jpeg"
                  className="form-style input-file-style"
                  onChange={handleThumbnailChange}
                />
              )}
              {errors.thumbnail && <p className="warning-style">Please Upload a Thumbnail</p>}
            </FormRow>
            <Requirements register={register} setValue={setValue} errors={errors} />
            <div className="flex justify-end">
              {!editCourse ? (
                <IconBtn type="submit" text="Create" disabled={loading ? true : false}>
                  <BiAddToQueue />
                </IconBtn>
              ) : (
                <div className="flex flex-row gap-x-2">
                  <button
                    className="p-1 bg-pure-greys-200 text-black font-bold rounded-md"
                    onClick={() => dispatch(setStep(2))}
                  >
                    Continue without saving
                  </button>
                  <IconBtn text="Save" type="submit" disabled={loading ? true : false}>
                    <MdOutlineModeEditOutline />
                  </IconBtn>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseCreator;
