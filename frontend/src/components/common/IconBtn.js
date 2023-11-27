import React from 'react'

const IconBtn = ({
    children,
    type,
    text,
    onClick,
    disabled=false,
    customClasses
}) => {
  return (
    <button onClick={onClick}
    type={type}
    disabled={disabled}
    className={`bg-yellow-50 font-semibold py-2 px-5 text-richblack-900 rounded-md ${customClasses}`}>
    {
        children ?  (
            <div className='flex items-center justify-center gap-x-2'>
                {text}
                {children}
            </div>
        ) : (text)
    }
    </button>
  )
}

export default IconBtn