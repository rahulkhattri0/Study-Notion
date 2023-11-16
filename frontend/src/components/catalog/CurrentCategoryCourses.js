import React from 'react'
import CourseCard from './CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import {Autoplay} from 'swiper/modules'

import 'swiper/css';
import 'swiper/css/pagination';


const CurrentCategoryCourses = ({name,courses}) => {

  return (
    <>

        <div className='text-2xl ml-10 mt-8 mb-5 font-bold flex flex-row gap-x-2'>
            <p className='text-richblack-25'>Courses in</p>
            <p className='text-yellow-25'>{name}</p>
        </div>
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            className='w-full max-h-max'
            breakpoints={{
            1024: {
              slidesPerView: 3,
            }
            }}
            grabCursor={true}
            autoplay={
                {
                    delay : 2500,
                    disableOnInteraction : false
                }
            }
            loop={true}
            modules={[Autoplay]}
        >
        {
            courses.map((course)=>{
                return <SwiperSlide key={course._id}>
                    <CourseCard data={course} customClasses={'m-4'} imgStyle={'h-[250px] w-full object-cover'}/>
                </SwiperSlide>
            })
        }
        </Swiper>
        
    </>
  )
}

export default CurrentCategoryCourses