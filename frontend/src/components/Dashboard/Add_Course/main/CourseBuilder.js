import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEditCourse, setStep } from '../../../../redux/slices/courseSlice';
import { apiCaller } from '../../../../services/apiConnector';
import { addSection, publishCourse, updateSection } from '../../../../services/operations/course';
import IconBtn from '../../../common/IconBtn';
import NestedView from '../NestedView';

const CourseBuilder = () => {
  const navigate = useNavigate();
  const { course } = useSelector((store) => store.course);
  const { _id: courseId } = course;
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [sectionId, setSectionId] = useState('');
  const [loading, setLoading] = useState(false);
  const { formState, handleSubmit, register, setValue } = useForm();
  const { errors } = formState;
  async function submit(data) {
    const sectionName = data.sectionName.trim();
    //if the section ID is empty then the user wants to create course
    //otherwise update
    setLoading(true);
    sectionId.length > 0
      ? await apiCaller(
          updateSection,
          true,
          sectionId,
          sectionName,
          courseId,
          token,
          dispatch,
          course
        )
      : await apiCaller(addSection, true, sectionName, courseId, token, dispatch, course);
    setLoading(false);
    setValue('sectionName', '');
    setSectionId('');
  }
  async function handlePublish() {
    //check if all sections contain content or not
    const check =
      course.courseContent.length === 0 ||
      course.courseContent.some((content) => content.subSection.length === 0);
    if (check) {
      toast.error('Please add content before publishing');
      return;
    }
    await publishCourse(courseId, course.category[0], token);
    navigate('/dashboard/my-courses');
  }
  return (
    <div className="flex flex-col gap-y-6 lg:w-[70%] md:w-[90%] w-[100%] mx-auto">
      <div className="rounded-md w-full border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex flex-col gap-y-6">
          <form onSubmit={handleSubmit(submit)}>
            <div className="flex flex-col gap-y-2">
              <label className="label-style" htmlFor="sectionName">
                Section Name
              </label>
              <input
                className="form-style"
                id="sectionName"
                name="sectionName"
                {...register('sectionName', { required: true })}
              />
              {errors.sectionName && <p className="warning-style">Please Enter Section Name</p>}
              <IconBtn
                disabled={loading}
                text={sectionId.length > 0 ? 'Edit Section Name' : 'Create Section'}
                type="submit"
                customClasses={'max-w-max'}
              >
                <IoMdAdd />
              </IconBtn>
              {sectionId.length > 0 && (
                <p
                  className="text-md text-richblack-100 cursor-pointer"
                  onClick={() => {
                    setSectionId('');
                    setValue('sectionName', '');
                  }}
                >
                  Cancel
                </p>
              )}
            </div>
          </form>
          <NestedView setSectionId={setSectionId} setValue={setValue} />
          <div className="flex justify-end">
            <button
              className="text-black bg-pure-greys-200 font-bold p-1 rounded-md"
              onClick={() => {
                dispatch(setStep(1));
                dispatch(setEditCourse(true));
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      {course.status === 'Draft' && (
        <div
          className="flex items-center p-4 gap-x-4 justify-center bg-yellow-200 bg-opacity-50 text-white lg:flex-row cursor-pointer md:flex-row flex-col rounded-md mx-auto w-full"
          onClick={handlePublish}
        >
          <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-yellow-100">
            <BsJournalBookmarkFill className="text-2xl" />
          </div>
          <div className="flex flex-col gap-y-1">
            <p>Publish course</p>
            <p className="text-sm">
              After publishing,your course will be visible to public and they can buy this course.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBuilder;
