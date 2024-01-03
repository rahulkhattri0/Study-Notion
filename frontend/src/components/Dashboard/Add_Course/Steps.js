import React from 'react';
import { courseSteps } from '../../../data/steps';
import { useSelector } from 'react-redux';

const Steps = () => {
  const step = useSelector((store) => store.course.step);
  return (
    <div className="flex items-center justify-center mb-5">
      <div className="flex flex-row gap-x-6 cursor-default">
        {courseSteps.map((element) => (
          <div className="flex flex-col gap-y-2 items-center" key={element.id}>
            <div
              className={`rounded-full aspect-square w-[34px] flex items-center justify-center  border-2
              ${
                element.number === step
                  ? 'border-yellow-50 bg-yellow-900 text-yellow-50'
                  : 'border-richblack-700 bg-richblack-800 text-richblack-300  '
              }`}
            >
              <p>{element.number}</p>
            </div>
            <p className={`${step === element.number ? 'text-white' : 'text-richblack-300'}`}>
              {element.data}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
