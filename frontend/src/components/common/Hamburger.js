import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { NavbarLinks } from '../../data/navbar-links'
import { useNavigate } from 'react-router-dom'
import HamburgerCategories from './HamburgerCategories'
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux'
const Hamburger = () => {
    const [open,setOpen] = useState(false)
    const token = useSelector((store)=>store.auth.token)
    const navigate = useNavigate()
  return (
    <div className='lg:hidden md:hidden flex'>
        <GiHamburgerMenu className='text-white cursor-pointer justify-center' onClick={()=>setOpen(prev=>!prev)}/>
        {
            open && (
                <div className='bg-white bg-opacity-10 backdrop-blur-sm fixed inset-0 flex z-10 items-center justify-center'>
                    <div className='flex flex-col gap-y-4 rounded-lg p-4 bg-richblack-50 relative'>
                        <IoCloseSharp className='absolute text-2xl top-2 right-2 cursor-pointer' onClick={()=>setOpen(false)}/>
                        {
                            NavbarLinks.map((link)=>(
                                link.id === "2" ? <HamburgerCategories setOpen={setOpen} key={"2"}/> : (
                                    <p key={link.id} className='cursor-pointer' onClick={()=>{
                                        setOpen(false)
                                        navigate(link.path)
                                    }}>{link.title}</p>
                                )
                            ))
                        }
                        {
                            token ? <p className='cursor-pointer' onClick={()=>{
                                setOpen(false)
                                navigate("/dashboard/my-profile")
                            }}>My Profile</p> : (
                                <div className='flex flex-row gap-x-2 cursor-pointer' onClick={(e)=>{
                                    const text = e.target.textContent
                                    if(text==="Log In"){
                                        navigate("/login")
                                        setOpen(false)
                                    }
                                    else if(text==="Sign Up"){
                                        navigate("/signUp")
                                        setOpen(false)
                                    }
                                }}>
                                    <p>Log In</p>
                                    <p>Sign Up</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Hamburger

