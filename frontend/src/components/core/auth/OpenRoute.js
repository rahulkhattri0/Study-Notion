import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
//agar token null ha to us route pe jane do
const OpenRoute = (props) => {
  const token = useSelector((store)=>store.auth.token)
  if(!token){
    return props.children
  }
  else {
    return <Navigate  to={"/dashboard/my-profile"} />
  }
}

export default OpenRoute