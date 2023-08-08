import React, { useState } from 'react'
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from "react-hot-toast"
import { sendOtp, signUp } from '../../../services/operations/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSignUpData } from '../../../redux/slices/authSlice'
const SignUpForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const {firstName,lastName,email,password,confirmPassword} = formData
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [accountType,setAccountType] = useState("Student")
    const tabData = [
        {
            id:1,
            type:"Student"
        },
        {
            id:2,
            type:"Instructor"
        }
    ]
    function handleChange(event){
        setFormData((prev)=>{
            return {
                ...prev,
                [event.target.name] : event.target.value
            }
        })
    }
    function handleSubmit(event){
        event.preventDefault()
        if(password!==confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        const signUpdata = {
            ...formData,
            accountType
        }
        dispatch(setSignUpData(signUpdata))
        sendOtp(email,navigate)
    }
  return (
    <>
        <Tab setHighlghted={setAccountType} highlighted={accountType} tabData={tabData}/>
        <form className='flex flex-col gap-y-4' onSubmit={handleSubmit}>
            <div className='flex flex-row gap-x-2'>
                <label className='w-[50%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Firstname <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    required
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                    className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
                <label className='w-[50%]'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Lastname <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    required
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                    className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
            </div>
            <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full rounded-md bg-richblack-800 p-[12px] text-richblack-5"
                    />
            </label>
            <div className='flex flex-row gap-x-2'>
                <label className='relative w-[50%]'>
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
                <label className='relative w-[50%]'>
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
            </div>
            <button
                type="submit"
                className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                Sign Up
            </button>
        </form>
    </>
  )
}

export default SignUpForm