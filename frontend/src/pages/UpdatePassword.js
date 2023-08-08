import React, { useState } from 'react'
import { resetPassword } from '../services/operations/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { AiOutlineEye } from "react-icons/ai"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import {BsArrowLeft} from "react-icons/bs"
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const UpdatePassword = () => {
    const [formData,setFormData] = useState({
        password : "",
        confirmPassword : ""
    })
    const location = useLocation()
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const {password,confirmPassword} = formData
    const navigate = useNavigate()
    function handleSubmit(event){
        event.preventDefault()
        if(password!==confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        const token = location.pathname.split("/").at(-1)
        resetPassword(password,confirmPassword,token,navigate)
    }
    function handleChange(event){
        setFormData((prev) => {
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }
  return (
    <div className='mx-auto flex flex-col gap-3 my-auto max-w-[450px]'>
         <p className='text-richblack-5 font-bold text-2xl'>Choose New Password</p>
         <p className='text-richblack-100'>Almost done. Enter your new password and youre all set.</p>
        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
            <label className='relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Password <sup className="text-pink-200">*</sup>
                </p>
                <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
                />
                        {
                            <div className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                            onClick={() => setShowPassword((prev)=>!prev)}>
                            {
                                showPassword===false ? 
                                (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) : 
                                (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                            } 
                            </div>
                        }
            </label>
            <label className='relative'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Confirm Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        placeholder="Enter password again"
                        className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    {
                            <div className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                            onClick={() => setShowConfirmPassword((prev)=>!prev)}>
                            {
                                showConfirmPassword===false ? 
                                (<AiOutlineEye fontSize={24} fill="#AFB2BF" />) : 
                                (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>)
                            } 
                            </div>
                    }
            </label>
            <button
                type="submit"
                className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                Reset Password
            </button>
        </form>
        <div className='flex gap-x-1 text-white items-center'>
                <BsArrowLeft/>
                <Link to={"/login"}>
                    Back to Login
                </Link>
                
            </div>
    </div>
  )
}

export default UpdatePassword