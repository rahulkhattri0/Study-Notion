import React, { useEffect, useState } from 'react'
import { NavbarLinks } from '../../data/navbar-links'
import { Link, useLocation} from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart,AiOutlineDown} from 'react-icons/ai'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import ProfileDropdown from './ProfileDropdown'
import Hamburger from './Hamburger'

const Navbar = () => {
  const token = useSelector((store)=>store.auth.token)
  const totalItems = useSelector((store)=>store.cart.totalItems)
  const user = useSelector((store)=>store.profile.user)
  const [subLinks,setSubLinks] = useState([])
  const  fetchCategories = async() => {
      try {
      const result = await apiConnector("GET",categories.CATEGORIES_API)
      console.log("printing categories",result)
      setSubLinks(result.data.data)
    } catch (error) {
      console.log(error)
      console.log("something went wrong while getting categories")
    }
  }
  useEffect(()=>{
    fetchCategories()
  },[])
  const location = useLocation()
  const matchRoute = (route) => {
      return route===location.pathname
  }
  return (
    <>
    <div className='flex h-14 border-b-[1px] items-center border-b-richblack-700 '>
        <div className='flex w-11/12 items-center justify-between relative'>
            <Link to={"/"}>
                <img src={logo} alt={`some thing`} width={160} height={42} loading='lazy'/>
            </Link>
            <nav>
              <ul className='lg:flex md:flex sm:hidden gap-x-6 text-richblack-25'>
                  {
                    NavbarLinks.map((link,index)=>{
                    return   (<li key={index}>
                            {
                              link.title === "Catalog" ? (
                              <div className='flex gap-1 items-center group relative'>
                                Category
                                <AiOutlineDown/>
                                <div className='invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[50%]
                                  flex flex-col rounded-md bg-richblack-25 p-4 text-richblack-900 trasition-all duration-200 group-hover:visible
                                  lg:w-[300px] z-10'>
                                  <div className='absolute left-[50%] bg-richblack-25 rounded-sm h-6 w-6 rotate-45 translate-y-[-45%] top-0 translate-x-[80%]'>
                                  </div>
                                  {
                                    subLinks.length===0 ? (<div className='text-richblack-25'>No categories found</div>) : (
                                      subLinks.map((link)=>(
                                        <Link to={`/catalog/${link.name}`}>
                                            <p key={link._id} className='text-richblack-900 p-3 m-2 text-md hover:bg-richblack-100 rounded-md'>{link.name}</p>
                                        </Link>
                                      ))
                                    )
                                  }
                              </div>
                              </div>) : (
                                <Link to={link.path}>
                                  <p className={`${matchRoute(link.path)? "text-yellow-25": "text-richblack-25"}`}>
                                    {link.title}
                                  </p>
                                </Link>
                              )
                            }
                        </li>)
                    })
                  }
              </ul>
            </nav>
            {/* cart and login signup wagera */}
            <div className='lg:flex md:flex sm:hidden gap-x-4 items-center'>
                  {
                    user && user.accountType !== "Instructor" && (
                      <Link to="/dashboard/cart" className='relative'>
                      <AiOutlineShoppingCart/>
                      {totalItems > 0 && (
                        <span>
                          {totalItems}
                        </span>
                      )}
                      </Link>
                    )
                  }
                  {
                    token === null && (
                      <Link to="/login">
                        <button className='text-richblack-25'>
                          Log In
                        </button>
                      </Link>
                    )
                  }
                  {
                    token === null && (
                      <Link to="/signUp">
                        <button className='text-richblack-25'>
                          Sign Up
                        </button>
                      </Link>
                    )
                  }
                  {
                    token !==null && <ProfileDropdown/>
                  }
            </div>
            <Hamburger/>
        </div>
    </div>
    </>
  )
}

export default Navbar