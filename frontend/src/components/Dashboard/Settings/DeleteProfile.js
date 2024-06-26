import React, { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Modal from '../../common/Modal';
import { deleteProfile } from '../../../services/operations/settings';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiCaller } from '../../../services/apiConnector';
const DeleteProfile = () => {
  const [modal, setModal] = useState(null);
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div className="my-10 flex lg:flex-row md:flex-row flex-col gap-y-4 gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12 items-center">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <button
          type="button"
          className="w-fit cursor-pointer italic text-pink-300"
          onClick={() =>
            setModal({
              text1: 'Are You Sure',
              text2: 'Do you wish to delete you account?',
              btn1Text: 'Proceed',
              btn2Text: 'Cancel',
              btn1Handler: () => apiCaller(deleteProfile(token, dispatch, navigate), true),
              btn2Handler: () => setModal(null)
            })
          }
        >
          I want to delete my account.
        </button>
      </div>
      {modal && <Modal modalData={modal} />}
    </>
  );
};

export default DeleteProfile;
