import React from 'react'

const Footer = ({instructorName,instructorImage}) => {
  return (
    <div className='flex flex-col gap-y-4 m-3'>
        <p className='text-2xl text-richblack-25'>Instructor</p>
        <div className='flex flex-row gap-x-2 items-center'>
            <img
                src={instructorImage}
                alt='instructor image'
                className='object-cover rounded-full w-[40px] aspect-square'
            />
            <p className='text-lg text-richblack-5'>{instructorName}</p>
        </div>
    </div>
    
  )
}

export default Footer