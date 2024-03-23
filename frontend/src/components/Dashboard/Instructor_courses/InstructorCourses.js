import React from 'react';
import { GrAdd } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFetchData from '../../../hooks/useFetchData';
import { getInstructorCourses } from '../../../services/operations/course';
import Error from '../../common/Error';
import IconBtn from '../../common/IconBtn';
import Shimmer from '../../common/Shimmer';
import Table from '../../common/Table';
import InstructorCourseRow from './InstructorCourseRow';

const InstructorCourses = () => {
  const token = useSelector((store) => store.auth.token);
  const navigate = useNavigate();
  const [data, isError, isLoading, setData] = useFetchData(getInstructorCourses, false, token);
  if (isLoading || data === null) {
    return <Shimmer number={5} flexDirection={`flex-col`} style={`p-20 m-4`} />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row justify-between">
        <p className="text-richblack-50 text-4xl">My Courses</p>
        <IconBtn text="Add course" onClick={() => navigate('/dashboard/add-course')}>
          <GrAdd />
        </IconBtn>
      </div>
      <Table columns={'grid-cols-[3fr_1fr_1fr]'}>
        <Table.Header>
          <div>COURSES</div>
          <div className="flex justify-center items-center">PRICE</div>
          <div className="flex justify-center items-center">ACTIONS</div>
        </Table.Header>
        <Table.Body
          data={data}
          render={(course) => (
            <InstructorCourseRow
              key={course._id}
              course={course}
              setData={setData}
              courses={data}
            />
          )}
        />
      </Table>
    </div>
  );
};

export default InstructorCourses;
