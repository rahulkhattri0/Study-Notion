import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/auth'
import {GiAnticlockwiseRotation} from "react-icons/gi"
import OtpInput from "react-otp-input"
const VerfiyEmail = () => {
    const navigate = useNavigate()
    const signUpData = useSelector((store)=>store.auth.signUpData)
    const [otpInput,setOtp] = useState("")
    //agar user directly is route pe ata hai to wapas signUp pe bhej do
    useEffect(()=>{
        if(!signUpData){
            navigate("/signUp")
        }
    },[])
    function handleResend(){
        sendOtp(signUpData.email,navigate)
    }
    function handleSubmit(event){
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
        } = signUpData
        console.log(otpInput)
        console.log(signUpData)
        event.preventDefault()
        signUp(firstName,lastName,email,password,confirmPassword,accountType,otpInput,navigate)
    }
  return (
    <div className='mx-auto flex flex-col gap-3 my-auto max-w-[450px]'>
         <p className='text-richblack-5 font-bold text-2xl'>Verify email</p>
         <p className='text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
         <form className='flex flex-col' onSubmit={handleSubmit}>
         <OtpInput
            value={otpInput}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>--</span>}
            renderInput={(props) => <input {...props} className='rounded-md bg-richblack-800 text-pure-greys-25 text-5xl m-2  focus:outline-yellow-100 font-mono' placeholder='-' required/>}
             />
            <button
                type="submit"
                className="mt-7 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                Sign Up
            </button>
         </form>
         <div className='flex justify-between'>
            <div className='flex gap-x-1 text-white items-center'>
                <BsArrowLeft/>
                <Link to={"/login"}>
                    Back to Login
                </Link>
            </div>
            <div onClick={handleResend} className='text-blue-100 flex items-center cursor-pointer gap-x-1'>
                <GiAnticlockwiseRotation/>
                Resend it
            </div>
         </div>
    </div>
  )
}

export default VerfiyEmail