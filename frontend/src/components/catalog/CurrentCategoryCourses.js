import React from 'react';
import CourseCard from './CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const CurrentCategoryCourses = ({ name, courses }) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <p className="text-richblack-25 font-bold text-2xl">
        Courses in <span className="text-yellow-25">{name}</span>
      </p>
      <div className=" border-richblack-700 bg-richblack-800 rounded-xl">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          className="w-full max-h-max"
          breakpoints={{
            1024: {
              slidesPerView: 3
            }
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {courses.map((course) => {
            return (
              <SwiperSlide key={course._id}>
                <CourseCard
                  data={course}
                  customClasses={'m-4'}
                  imgStyle={'h-[250px] w-full object-cover'}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CurrentCategoryCourses;
