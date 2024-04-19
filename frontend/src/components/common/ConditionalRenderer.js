import React from 'react'

export const ConditionalRenderer = ({isVisible,children}) => {
  return (
    <>
        {isVisible && children}
    </>
  )
}
