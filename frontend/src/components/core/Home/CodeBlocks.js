import React from 'react'
import {FaArrowRight} from 'react-icons/fa'
import CTAButton from './CTAButton'
import HighlightedText from './HighlightedText'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({position,heading,codeblock,codeColor,subHeading,ctabtn1,ctabtn2}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-20 mx-auto`}>
        <div className='flex flex-col lg:w-[50%] md:w-[50%] w-[100%] gap-8'>
            {heading}
            <div className='font-bold text-richblack-300'>
                {subHeading}
            </div>
            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.text}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn2.text}
                    </div>
                </CTAButton>
            </div>
        </div>
        <div className=' h-fit flex flex-row lg:w-[50%] md:w-[50%] w-[100%] py-4 px-7 bg-opacity-20 rounded-lg bg-richblue-200'>
            <div className='text-center flex flex-col w-[5%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[95%] flex flex-col gap-2 font-bold font-mono pr-2 ${codeColor}`}>
            <TypeAnimation
                sequence={[codeblock,10000,""]}
                repeat={Infinity}
                style={
                    {
                        whiteSpace: "pre-line",
                        display :"block"
                    }
                }
                omitDeletionAnimation={true}
            />

            </div>
        </div>
    </div>
  )
}

export default CodeBlocks