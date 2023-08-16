import React from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../services/operations/settings'
const EditProfile = () => {
    const token = useSelector((store)=>store.auth.token)
    const genders = [{id:1,gender:"Male"}, {id:2,gender:"Female"}, {id:3,gender:"Non-Binary"}, {id:4,gender:"Prefer not to say"}]
    const {
        handleSubmit,
        register,
        formState
    } = useForm()
    const user = useSelector((store)=>store.profile.user)
    const dispatch = useDispatch()
    const { errors } = formState
    function formSubmit(data){
        console.log("details",data)
        updateProfile(data,dispatch,token,user)
    }
    const navigate = useNavigate()
  return (
    <>
        <form onSubmit={handleSubmit(formSubmit)} className='relative'>
            <div
            className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12'>
                <h2 className='text-lg font-semibold text-richblack-5'>Profile Information</h2>
                <div className='flex-col gap-y-3'>
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex flex-col gap-y-2'>
                            <label className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5' htmlFor='firstName'>Firstname</label>
                            <input
                                defaultValue={user.firstName}
                                className='form-style'
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                {...register("firstName",{required:true})}
                            />
                            {
                                errors.firstName && (
                                    <p className='mt-1 text-[12px] text-yellow-100'>
                                        Please add firstName
                                    </p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5' htmlFor='lastName'>Lastname</label>
                            <input
                                defaultValue={user.lastName}
                                className='form-style'
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter first name"
                                {...register("lastName",{required:{value:true,message:"Please add Lastname"}})}
                            />
                            {
                                errors.lastName && (
                                    <p className='mt-1 text-[12px] text-yellow-100'>
                                        {errors.lastName.message}
                                    </p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="dateOfBirth" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-style"
                                {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date of Birth.",
                                },
                                //so that the user cannnot select a date greater than current date.
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future.",
                                },
                                })}
                                defaultValue={user.additionalDetails.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="mt-1 text-[12px] text-yellow-100">
                                {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="contactNumber" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="form-style"
                                {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                                })}
                                defaultValue={user.additionalDetails.contactNumber}
                            />
                            {errors.contactNumber && (
                                <span className="mt-1 text-[12px] text-yellow-100">
                                {errors.contactNumber.message}
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="about" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                About
                            </label>
                            <input
                                type="text"
                                name="about"
                                id="about"
                                placeholder="Enter Bio Details"
                                className="form-style"
                                {...register("about", {
                                required: {
                                    value: true,
                                    message: "Please bio details",
                                }})}
                                defaultValue={user.additionalDetails.about}
                            />
                            {errors.about && (
                                <span className="mt-1 text-[12px] text-yellow-100">
                                {errors.about.message}
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor="gender" className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Gender
                            </label>
                            <select
                            className='form-style'
                            name='gender'
                            id='gender'
                            {...register("gender", {
                            required: {
                                value: true,
                                message: "Please select gender",
                            }})}
                            defaultValue={user.additionalDetails.gender}
                            >
                                {
                                    genders.map((gender)=>{
                                        return (
                                            <option key={gender.id}>
                                                {gender.gender}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end gap-x-3'>
                <button
                onClick={() => {
                navigate("/dashboard/my-profile")
                }}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                >
                    Cancel
                </button>
                <IconBtn text='Submit' type='submit'/>
            </div>
        </form>
    </>
  )
}

export default EditProfile