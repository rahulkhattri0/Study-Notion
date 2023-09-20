import React from 'react'
import Steps from './Steps'
import { Outlet } from 'react-router-dom'
const Course = () => {
  return (
    <>
        <Steps/>
        <Outlet/>
    </>
  )
}

export default Course