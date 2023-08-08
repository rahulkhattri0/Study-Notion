import React, { useState } from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import { NavbarLinks } from '../../data/navbar-links'
import { Link } from 'react-router-dom'
const Hamburger = () => {
    const [open,setOpen] = useState(false)
  return (
    <div className='lg:hidden md:hidden sm:flex'>
        <GiHamburgerMenu className='text-white cursor-pointer' onClick={()=>setOpen(prev=>!prev)}/>
        {
            open && (
                <div className='flex flex-col gap-y-2 absolute z-40 w-full bg-richblack-50  text-richblack-800'>
                    {
                        NavbarLinks.map((link)=>{
                            return (
                                <Link to={link.path} key={link.id}>
                                    <p>{link.title}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            )
        }
    </div>
  )
}

export default Hamburger