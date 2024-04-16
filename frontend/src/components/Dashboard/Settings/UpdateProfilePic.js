import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../common/IconBtn';
import { toast } from 'react-hot-toast';
import { updateProfilePicture } from '../../../services/operations/settings';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { apiCaller } from '../../../services/apiConnector';
const UpdateProfilePic = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.profile.user);
  const token = useSelector((store) => store.auth.token);
  const [image, setImage] = useState(null); //actual image
  const [preview, setPreview] = useState(null); //for preview purpose
  const inputRef = useRef();
  function handlefilechange(event) {
    // console.log(event.target.files[0])
    const file = event.target.files[0];
    console.log('file-->', file);
    if (file) {
      setImage(file);
      operationsForImagePreview(file);
    }
  }
  async function handleUpload() {
    if (!image) {
      toast.error('Please select an image');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    //you dont have to add headers if the image file is wrapped in fotm data
    formData.append('pfp', image);
    await apiCaller(updateProfilePicture(token, formData, dispatch), true);
    setLoading(false);
    setImage(null);
  }
  function operationsForImagePreview(file) {
    //A data URL is a base64-encoded representation of the file's content,
    //which can be used to embed binary data directly into HTML.
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
  }
  function handleSelect() {
    inputRef.current.click();
    // console.log(inputRef.current)
  }
  return (
    <>
      <div className="flex gap-x-4 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
        <img
          src={preview || user.image}
          alt={user.firstName}
          className="aspect-square w-[78px] rounded-full object-cover"
        />
        <div className="flex flex-col gap-y-2">
          <p className="font-inter">Change Profile Picture</p>
          <div className="flex flex-row gap-x-2">
            {/* for styling purposes we are keeping this hidden and its work will be handled by the button
                since the input field is hidden and the user cant see or click it,we will use useRef hook to attach a click functionality.
                The .click() method simulates a click event on the element */}
            <input
              type="file"
              ref={inputRef}
              onChange={handlefilechange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg"
            />
            <button
              className="rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              onClick={handleSelect}
              disabled={loading}
            >
              Select
            </button>
            <IconBtn
              onClick={handleUpload}
              text={loading ? 'Uploading...' : 'Upload'}
              disabled={loading}
            >
              <AiOutlineCloudUpload className="text-xl" />
            </IconBtn>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfilePic;
