import React from 'react'
import * as Icons from 'react-icons/vsc'
import { Link, useLocation } from 'react-router-dom'
const SidebarLink = ({data}) => {
    const location = useLocation()
    const Icon = Icons[data.icon]
  return (
    <div className={`${data.path.includes(location.pathname) ? "bg-yellow-800 text-yellow-100 border-l-4 border-yellow-200" : "text-richblack-5"}`}>
        <Link to={data.path[0]}>
            <div className='flex gap-x-2 p-2 items-center'>
                <Icon/>
                <p>{data.name}</p>
            </div>
        </Link>
    </div>
  )
}

export default SidebarLink