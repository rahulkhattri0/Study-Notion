import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { PiCurrencyInrBold } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import Error from '../components/common/Error';
import Loader from '../components/common/Loader';
import { colorsRGBA } from '../data/chart-colors';
import useFetchData from '../hooks/useFetchData';
import { getInstructorIncome } from '../services/operations/profile';

ChartJS.register(ArcElement, Tooltip, Legend); //from documentation

const InstructorIncome = () => {
  const token = useSelector((store) => store.auth.token);
  const [data, isError, isLoading] = useFetchData(getInstructorIncome, false, token);
  console.log(data);
  const options = {
    legend: {
      labels: {
        fontColor: 'red' // Change label color here
      }
    }
  };
  function getRandomColors(numColors) {
    if (numColors) {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        colors.push(colorsRGBA[Math.floor(Math.random() * colorsRGBA.length)]);
      }
      return colors;
    }
  }
  const chartData = {
    labels: data?.courseData.map((item) => item.course),
    datasets: [
      {
        data: data?.courseData.map((item) => item.studentsEnrolled),
        backgroundColor: getRandomColors(data?.courseData.length)
      }
    ]
  };
  if (isError) {
    return <Error />;
  }
  if (isLoading || data === null) {
    return <Loader />;
  }
  return (
    <div className="bg-richblack-800 backdrop-blur-sm rounded-md flex flex-col gap-y-4 items-center">
      {data.income === 0 ? (
        <p className="text-richblack-100">Not Enough Data!</p>
      ) : (
        <>
          <p className="text-2xl text-richblack-5">Course Enrollment Chart</p>
          <div className="flex justify-center h-[300px] lg:h-[500px] md:h-[500px] w-full">
            <Pie data={chartData} options={options} />
          </div>
          <div className="text-2xl flex flex-col gap-y-4 items-center">
            <p className="text-richblack-100">Total Revenue</p>
            <div className="flex flex-row gap-x-2 items-center text-yellow-50">
              <PiCurrencyInrBold />
              <p>{data.income}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default InstructorIncome;
