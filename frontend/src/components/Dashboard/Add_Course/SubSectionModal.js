import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import IconBtn from '../../common/IconBtn'
import { MdCreateNewFolder } from 'react-icons/md'
import { FiEdit2 } from 'react-icons/fi'
import { addsubsection, editsubsection } from '../../../services/operations/course'
import { useDispatch, useSelector } from 'react-redux'
import { setCourse } from '../../../redux/slices/courseSlice'
import { UseSelector } from 'react-redux/es/hooks/useSelector'
import ReactPlayer from 'react-player'
import toast from 'react-hot-toast'
import Modal from '../../common/Modal'
const SubSectionModal = ({
  addSubSection,
  setAddSubSection,
  editSubSection,
  setEditSubSection
}) => {
  const {register ,formState,handleSubmit,setValue,getValues} = useForm({
    defaultValues : {
      videoFile : `${editSubSection?.videoUrl}` 
    }
  })
  const {errors} = formState
  const {token} = useSelector((store)=>store.auth)
  const dispatch = useDispatch()
  const {course} = useSelector((store)=>store.course)
  const {_id} = useSelector((store)=>store.course.course)
  const [videoURL,setVideoURL] = useState(null)
  const [initialFormData,setInitialFormdata] = useState({})
  const [videoUploading,setVideoUploading] = useState(false)
  useEffect(()=>{
    register("videoFile",{required:true})
    if(editSubSection?.videoUrl){
      setVideoURL(editSubSection.videoUrl)
    }
    setInitialFormdata(getValues())
  },[])
  function handleChange(event){
    const videoFile = event.target.files[0]
    const url = URL.createObjectURL(videoFile)
    setVideoURL(url)
    setValue("videoFile",videoFile)
  }
  async function submit(form){
    const formdata = new FormData()
    formdata.append("videoFile",form.videoFile)
    formdata.append("title",form.title)
    formdata.append("description",form.description)
    formdata.append("courseId",_id)
    if(addSubSection){
      const {sectionId} = addSubSection
      formdata.append("sectionId",sectionId)
      setVideoUploading(true)
      const updatedContent = await addsubsection(formdata,token)
      setVideoUploading(false)
      //coz of some error in the network call updated content can be undefined so we need to check
      updatedContent && dispatch(setCourse({
        ...course,
        courseContent : updatedContent
      })) 
      setAddSubSection(null)
    }
    else{
      const {subSectionId} = editSubSection
      formdata.append("subSectionId",subSectionId)
      if(JSON.stringify(form)===JSON.stringify(initialFormData)){
        toast.error("No changes made")
        return
      }
      setVideoUploading(true)
      const updatedContent = await editsubsection(formdata,token)
      setVideoUploading(false)
      updatedContent && dispatch(setCourse({
        ...course,
        courseContent : updatedContent
      }))
      setEditSubSection(null)
    }
  }
  return (
    <div className='bg-white bg-opacity-10 backdrop-blur-sm z-[1000] fixed inset-0 flex items-center justify-center overflow-y-scroll'>
        <form className='absolute top-0 bg-richblack-800 p-4 rounded-md border-richblack-400 lg:w-[40%] md:w-[80%] w-[100%] flex flex-col gap-y-10 m-4' onSubmit={handleSubmit(submit)}>
            <div className= 'font-bold text-white'>
                <p>{addSubSection ? 'Adding' : 'Editing'} Lecture</p>
            </div>
            <div className='flex flex-col gap-y-1'>
              <label className='label-style' htmlFor='video'>Lecture Video</label>
              {
                  videoURL ?
                  (
                    <div className='mx-auto'>
                      <ReactPlayer 
                      url={videoURL}
                      width='100%'
                        controls
                      />
                      <p className='text-richblack-400 cursor-pointer' 
                      onClick={()=>{
                        setVideoURL(null)
                        setValue("videoFile",null)
                      }
                      }>Cancel</p>
                    </div>
                  ):
                  (
                    <input
                    type='file'
                    id='video'
                    name='video'
                    className='form-style input-file-style'
                    accept="video/mp4,video/quicktime"
                    onChange={handleChange}
                    />
                  )
              }
              {
                errors.videoFile && <p className='warning-style'>Please select a video</p>
              }
            </div>
            <div className='flex flex-col gap-y-1'>
                <label className='label-style' htmlFor='title'>Lecture Title</label>
                <input className='form-style'
                  name='title'
                  id='title'
                  {...register("title",{required:true})}
                  placeholder='Enter a title..'
                  defaultValue={editSubSection?.title}
                />
                {
                  errors.title && <p className='warning-style'>Please Enter Title</p>
                }
            </div>
            <div className='flex flex-col gap-y-1'>
              <label className='label-style' htmlFor='description'>Lecture Description</label>
              <textarea className='form-style'
                rows={3}
                cols={30}
                name='description'
                id='description'
                {...register("description",{required:true})}
                placeholder='Enter a short description..'
                defaultValue={editSubSection?.description}
              />
              {
                errors.description && <p className='warning-style'>Please Enter a short description</p>
              }
            </div>
            <div className='flex justify-end gap-x-2'>
              <button
              className='bg-richblack-300 text-black font-bold rounded-md p-2'
              onClick={()=> addSubSection ? setAddSubSection(null) : setEditSubSection(null) }
              disabled={videoUploading}
              >Cancel</button>
              <IconBtn
              type='submit'
              text= { addSubSection ? 'create' : 'Save'}
              disabled = {videoUploading}
              >
                { addSubSection ? <MdCreateNewFolder/> : <FiEdit2/> }
              </IconBtn>
            </div>
        </form>
        
    </div>
  )
}

export default SubSectionModal