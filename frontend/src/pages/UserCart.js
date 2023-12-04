import React from 'react'
import CartTable from '../components/Cart/CartTable'

const UserCart = () => {
  return (
    <div>
        <p className='text-4xl text-richblack-5 m-6'>
            Cart
        </p>
        <CartTable/>
    </div>
  )
}

export default UserCart