import React from 'react'
import { useForm } from 'react-hook-form'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import TagInput from '../TagInput'
import { useDispatch, useSelector } from 'react-redux'
import Requirements from '../Requirements'
import IconBtn from '../../../common/IconBtn'
import {AiOutlineSave} from 'react-icons/ai'
import { createCourse } from '../../../../services/operations/course'
import { useNavigate } from 'react-router-dom'
const CourseCreator = () => {
  const {
    handleSubmit,
    register,
    formState,
    setValue
} = useForm()
const navigate = useNavigate()
const dispatch = useDispatch()
const token = useSelector((store)=>store.auth.token)
const categories = useSelector((store)=>store.category.categories)
console.log("yeh hai cate",categories)
console.log("yeh hai",categories)
const {errors} = formState
async function courseFormSubmit(data){
  console.log(data)
  const formdata = new FormData()
  formdata.append("courseName",data.courseName)
  formdata.append("courseDescription",data.courseDescription)
  formdata.append("whatYouWillLearn",data.whatYouWillLearn)
  formdata.append("price",data.price)
  formdata.append("category",data.category)
  formdata.append("tags",JSON.stringify(data.tags))
  formdata.append("instructions",JSON.stringify(data.instructions))
  formdata.append("thumbnailImage",data.thumbnailImage[0])
  await createCourse(formdata,token,dispatch)
  navigate("/dashboard/course/build-course")
}
  return (
    <>
      <div className='flex gap-x-4 items-center rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5'>
        <form className='w-full' onSubmit={handleSubmit(courseFormSubmit)}>
          <div className='flex flex-col p-2 gap-y-2'>
            <label className='label-style' htmlFor='courseName'>Course Name
            <sup className="text-pink-200">*</sup></label>
              <input
              id='courseName'
              name='courseName'
              className='form-style'
              type='text'
              {...register("courseName",{required:true})}
              />
              {
                errors.courseName && (
                  <p className='warning-style'>
                    Please Enter Course Name
                  </p>
                )
              }
              <label className='label-style' htmlFor='courseDescription'>Course Description
                <sup className="text-pink-200">*</sup>
              </label>
              <textarea
              cols='30'
              rows='7'
              id='courseDescription'
              name='courseDescription'
              className='form-style'
              type='text'
              {...register("courseDescription",{required:true})}
              />
              {
                errors.courseDescription && (
                  <p className='warning-style'>
                    Please Enter a short Description of the course
                  </p>
                )
              }
              <label className='label-style' htmlFor='whatYouWillLearn'>Benefits of the course
                <sup className="text-pink-200">*</sup>
              </label>
              <textarea
              cols='30'
              rows='5'
              id='whatYouWillLearn'
              name='whatYouWillLearn'
              className='form-style'
              type='text'
              {...register("whatYouWillLearn",{required:true})}
              />
              {
                errors.whatYouWillLearn && (
                  <p className='warning-style'>
                    Please Enter Benefits of taking the course
                  </p>
                )
              }
              <label className='label-style' htmlFor='price'>
                Price
                <sup className="text-pink-200">*</sup>
              </label>
              <div className='relative form-style'>
                <HiOutlineCurrencyRupee className='text-richblack-200 top-2  left-2 absolute text-3xl'/>
                <input
                    type='number'
                    className='ml-8 bg-richblack-700 focus:outline-none'
                    id='price'
                    name='price'
                    {...register("price",{required:true})}
                />
              </div>
              {
                  errors.price && (
                    <p className='warning-style'>
                      Please Enter Price
                    </p>
                  )
              }
              <label className='label-style' htmlFor='category'>Category
              <sup className="text-pink-200">*</sup></label>
              <select
                className='form-style'
                id='category'
                name = 'category'
                {...register("category",{required : true})}
              >
                {
                  categories.map((category)=>(
                    <option key={category.id} value={category._id}>{category.name}</option>
                  ))
                }
                {
                  errors.category && (
                    <p className='warning-style'>Please Select a category</p>
                  )
                }
              </select>

              <TagInput
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <label className='label-style' htmlFor='thumbnailImage'>Thumbnail
              <sup className="text-pink-200">*</sup></label>
              <input
                type='file'
                name='thumbnailImage'
                id='thumbnailImage'
                accept='image/png, image/gif, image/jpeg'
                className='form-style file:bg-yellow-50 file:bg-opacity-50 file:rounded-lg file:text-white'
                {...register("thumbnailImage",{required : true})}
              />
              {
                errors.thumbnailImage && (
                  <p className='warning-style'>Please Upload a Thumbnail</p>
                )
              }
              <Requirements 
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <div className='flex justify-end'>
                <IconBtn
                type='submit'
                text='Save'
                >
                  <AiOutlineSave/>
                </IconBtn>
              </div>
          </div>
        </form>
      </div>
    </>
    
  )
}

export default CourseCreator