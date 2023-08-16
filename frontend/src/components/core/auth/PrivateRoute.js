import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const token = useSelector((store)=>store.auth.token)
    if(token!==null){
        return children
    }
    else {
        console.log("enter herererere")
        return <Navigate  to='/login'/>
    }
}

export default PrivateRoute