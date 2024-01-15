import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import IconBtn from '../../common/IconBtn';
import { MdCreateNewFolder } from 'react-icons/md';
import { FiEdit2 } from 'react-icons/fi';
import { addsubsection, editsubsection } from '../../../services/operations/course';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../redux/slices/courseSlice';
import ReactPlayer from 'react-player';
import toast from 'react-hot-toast';
import FormRow from '../../common/FormRow';
const SubSectionModal = ({ subSectionDispatch, subSectionState }) => {
  const { status } = subSectionState;
  const subSection = status === 'Edit' ? subSectionState.subSection : null;
  const { register, formState, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      videoFile: `${status === 'Edit' ? subSection.videoUrl : null}`
    }
  });
  const { errors } = formState;
  const { token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { course } = useSelector((store) => store.course);
  const [videoURL, setVideoURL] = useState(subSection?.videoUrl);
  const initialFormData = useRef({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    register('videoFile', { required: true });
    initialFormData.current = getValues();
  }, []);
  function handleChange(event) {
    const videoFile = event.target.files[0];
    const url = URL.createObjectURL(videoFile);
    setVideoURL(url);
    setValue('videoFile', videoFile);
  }
  async function submit(form) {
    const formdata = new FormData();
    formdata.append('videoFile', form.videoFile);
    formdata.append('title', form.title);
    formdata.append('description', form.description);
    formdata.append('courseId', course._id);
    if (status === 'Add') {
      const sectionId = subSectionState.sectionId;
      formdata.append('sectionId', sectionId);
      setLoading(true);
      const updatedContent = await addsubsection(formdata, token);
      setLoading(false);
      //coz of some error in the network call updated content can be undefined so we need to check
      updatedContent &&
        dispatch(
          setCourse({
            ...course,
            courseContent: updatedContent
          })
        );
    } else {
      formdata.append('subSectionId', subSection._id);
      if (JSON.stringify(form) === JSON.stringify(initialFormData.current)) {
        toast.error('No changes made');
        return;
      }
      setLoading(true);
      const updatedContent = await editsubsection(formdata, token);
      setLoading(false);
      updatedContent &&
        dispatch(
          setCourse({
            ...course,
            courseContent: updatedContent
          })
        );
    }
    subSectionDispatch({ type: 'Reset' });
  }
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-sm z-[1000] fixed inset-0 flex items-center justify-center overflow-y-scroll">
      <form
        className="absolute top-0 bg-richblack-800 p-4 rounded-md border-richblack-400 lg:w-[40%] md:w-[80%] w-[100%] flex flex-col gap-y-5 m-4"
        onSubmit={handleSubmit(submit)}
      >
        <p className="font-bold text-white">{status === 'Add' ? 'Adding' : 'Editing'} Lecture</p>
        <FormRow labelText="Lecture Video">
          {videoURL ? (
            <div className="mx-auto">
              <ReactPlayer url={videoURL} width="100%" controls />
              <p
                className="text-richblack-400 cursor-pointer"
                onClick={() => {
                  setVideoURL(null);
                  setValue('videoFile', null);
                }}
              >
                Cancel
              </p>
            </div>
          ) : (
            <input
              type="file"
              id="video"
              name="video"
              className="form-style input-file-style"
              accept="video/mp4,video/quicktime"
              onChange={handleChange}
            />
          )}
          {errors.videoFile && <p className="warning-style">Please select a video</p>}
        </FormRow>
        <FormRow labelText="Lecture Title">
          <input
            className="form-style"
            name="title"
            id="title"
            {...register('title', { required: true })}
            placeholder="Enter a title.."
            defaultValue={subSection?.title}
          />
          {errors.title && <p className="warning-style">Please Enter Title</p>}
        </FormRow>
        <FormRow labelText="Lecture Description">
          <textarea
            className="form-style"
            rows={3}
            cols={30}
            name="description"
            id="description"
            {...register('description', { required: true })}
            placeholder="Enter a short description.."
            defaultValue={subSection?.description}
          />
          {errors.description && <p className="warning-style">Please Enter a short description</p>}
        </FormRow>
        <div className="flex justify-end gap-x-2">
          <button
            className="bg-richblack-300 text-black font-bold rounded-md p-2"
            onClick={() => subSectionDispatch({ type: 'Reset' })}
            disabled={loading}
          >
            Cancel
          </button>
          <IconBtn type="submit" text={status === 'Add' ? 'create' : 'Save'} disabled={loading}>
            {status === 'Add' ? <MdCreateNewFolder /> : <FiEdit2 />}
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default SubSectionModal;
