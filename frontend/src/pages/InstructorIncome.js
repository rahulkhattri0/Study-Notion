import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getInstructorIncome } from '../services/operations/profile';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { PiCurrencyInrBold } from 'react-icons/pi';

ChartJS.register(ArcElement, Tooltip, Legend); //from documentation

const InstructorIncome = () => {
  const [data, setData] = useState(null);
  const token = useSelector((store) => store.auth.token);
  useEffect(() => {
    fetchInstructorData(token);
  }, []);
  async function fetchInstructorData(token) {
    const [income, courseData] = await getInstructorIncome(token);
    console.log(courseData);
    if (income && courseData) {
      console.log('emter');
      setData({
        income,
        courseData
      });
    }
  }
  function getRandomColors(numColors) {
    if (numColors) {
      const colors = [];
      for (let i = 0; i < numColors; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        colors.push(`rgba(${r},${g},${b},0.2)`);
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
  console.log(chartData);
  return (
    <div className="bg-richblack-800 backdrop-blur-sm rounded-md flex flex-col gap-y-4 items-center p-2">
      {data ? (
        <>
          <p className="text-2xl text-richblack-5">Course Enrollment Chart</p>
          <div className="flex justify-center h-[300px] lg:h-[500px] md:h-[500px] w-full">
            <Pie data={chartData} />
          </div>
          <div className="text-2xl flex flex-col gap-y-4 items-center">
            <p className="text-richblack-100">Total Revenue</p>
            <div className="flex flex-row gap-x-2 items-center text-yellow-50">
              <PiCurrencyInrBold />
              <p>{data.income === 0 ? 'Not enought data!' : `${data.income}`}</p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-white">Not Enough data!</p>
      )}
    </div>
  );
};

export default InstructorIncome;
