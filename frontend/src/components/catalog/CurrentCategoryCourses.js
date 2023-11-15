import React from 'react'
// import {Swiper, SwiperSlide} from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper'
// import CourseCard from './CourseCard'



const CurrentCategoryCourses = ({name,courses}) => {

  return (
    <>
        {/* <div className='text-2xl ml-10 mt-8 mb-5 font-bold flex flex-row gap-x-2'>
            <p className='text-richblack-25'>Courses in</p>
            <p className='text-yellow-25'>{name}</p>
        </div>
        <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            modules={[FreeMode, Pagination]}
            breakpoints={{
                1024: {
                slidesPerView: 3,
                },
            }}
            className="h-[30rem]"
        >
        {
            courses.map((course)=>{
                return <SwiperSlide key={course._id}>
                    <CourseCard data={course}/>
                </SwiperSlide>
            })
        }
        </Swiper>
         */}
    </>
  )
}

export default CurrentCategoryCourses