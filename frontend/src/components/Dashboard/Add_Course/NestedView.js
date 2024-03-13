import React, { useReducer, useState } from 'react';
import toast from 'react-hot-toast';
import { FiEdit2 } from 'react-icons/fi';
import { IoIosAdd } from 'react-icons/io';
import { MdOutlineDelete } from 'react-icons/md';
import { RxDropdownMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { apiCaller } from '../../../services/apiConnector';
import { deleteSection, deleteSubSection } from '../../../services/operations/course';
import Modal from '../../common/Modal';
import SubSectionModal from './SubSectionModal';
import { subSectionReducer } from './reducers/SubSectionReducer';

const NestedView = ({ setSectionId, setValue }) => {
  const { course } = useSelector((store) => store.course);
  const { token } = useSelector((store) => store.auth);
  const [subSectionstate, subSectionDispatch] = useReducer(subSectionReducer, null);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  async function handleDeleteSection(sectionId) {
    setLoading(true);
    if (course.courseContent.length === 1 && course.status === 'Published') {
      toast.error('Published course must have at least one section!');
    } else {
      await apiCaller(deleteSection, true, sectionId, course._id, token, dispatch, course);
    }
    setLoading(false);
  }
  async function handleDeleteSubSection(subSectionId, sectionId) {
    setLoading(true);
    await apiCaller(deleteSubSection, true, sectionId, subSectionId, token, dispatch, course);
    setLoading(false);
  }
  return (
    course.courseContent.length > 0 && (
      <div className="rounded-md bg-richblack-700 p-4 text-black flex flex-col gap-y-3">
        {course.courseContent.map((section) => {
          return (
            <details key={section._id}>
              <summary className="flex flex-row justify-between border-b-2 border-richblack-600 cursor-pointer">
                <div className="flex flex-row gap-x-2 items-center text-richblack-100">
                  <RxDropdownMenu className="text-2xl cursor-pointer" />
                  <p className="text-lg font-semibold">{section.sectionName}</p>
                </div>
                <div className="flex flex-row gap-x-3 text-richblack-100 items-center">
                  <FiEdit2
                    className="cursor-pointer hover:text-yellow-50 text-xl"
                    onClick={() => {
                      setSectionId(section._id);
                      setValue('sectionName', section.sectionName);
                    }}
                  />
                  <MdOutlineDelete
                    className="cursor-pointer text-2xl hover:text-red-100 hover:animate-pulse"
                    onClick={() => {
                      if (!loading) {
                        setModalData({
                          text1: 'Are You sure',
                          text2: 'This section will Be deleted',
                          btn1Text: 'Proceed',
                          btn1Handler: () => {
                            setModalData(null);
                            handleDeleteSection(section._id);
                          },
                          btn2Text: 'Cancel',
                          btn2Handler: () => {
                            setModalData(null);
                          }
                        });
                      }
                    }}
                  />
                </div>
              </summary>
              <div className="ml-10 flex flex-col gap-y-2 cursor-pointer p-2">
                {section.subSection.map((subSection) => {
                  return (
                    <div
                      className="border-b-2 border-richblack-600 flex flex-row justify-between"
                      key={subSection._id}
                    >
                      <p className="text-richblack-100">{subSection.title}</p>
                      <div className="flex flex-row gap-x-2 items-center text-richblack-100">
                        <p>{parseInt(subSection.timeDuration)} s</p>
                        <FiEdit2
                          className="text-md cursor-pointer hover:text-yellow-50"
                          onClick={() => {
                            subSectionDispatch({
                              type: 'Edit',
                              payload: {
                                subSection: {
                                  ...subSection,
                                  sectionId: section._id
                                }
                              }
                            });
                          }}
                        />
                        <MdOutlineDelete
                          className="text-xl cursor-pointer hover:text-red-100 hover:animate-pulse"
                          onClick={() => {
                            !loading &&
                              setModalData({
                                text1: 'Are You Sure?',
                                text2: 'This Sub-Section will be deleted',
                                btn1Text: 'Proceed',
                                btn2Text: 'Cancel',
                                btn1Handler: () => {
                                  setModalData(null);
                                  handleDeleteSubSection(subSection._id, section._id);
                                },
                                btn2Handler: () => {
                                  setModalData(null);
                                }
                              });
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="font-bold text-yellow-50 flex flex-row gap-x-1 items-center text-md">
                  <IoIosAdd className="text-md" />
                  <p
                    onClick={() => {
                      subSectionDispatch({
                        type: 'Add',
                        payload: {
                          sectionId: section._id
                        }
                      });
                    }}
                  >
                    Add Lecture
                  </p>
                </div>
              </div>
            </details>
          );
        })}
        {subSectionstate && (
          <SubSectionModal
            subSectionState={subSectionstate}
            subSectionDispatch={subSectionDispatch}
          />
        )}
        {modalData && <Modal modalData={modalData} />}
      </div>
    )
  );
};

export default NestedView;
