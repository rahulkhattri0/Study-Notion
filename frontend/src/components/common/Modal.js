import React from 'react'

const Modal = ({modalData}) => {
  return (
    <div className='bg-white bg-opacity-10 backdrop-blur-sm fixed inset-0 flex items-center'>
        <div className='flex flex-col mx-auto my-auto rounded-lg border-richblack-400 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>{modalData.text1}</p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>{modalData.text2}</p>
            <div className='flex items-center gap-x-4'>
                <button onClick={modalData.btn1Handler} className='cursor-pointer rounded-md bg-yellow-100 py-[8px] px-[20px] font-semibold text-richblack-900'>
                    {modalData.btn1Text}
                </button>
                <button className='cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900' onClick={modalData.btn2Handler}>
                    {modalData.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}

export default Modal