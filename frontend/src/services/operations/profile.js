import { toast } from 'react-hot-toast';
import { profileEndpoints } from '../apis';
import { apiConnector } from '../apiConnector';

const { GET_ENROLLED_COURSES, GET_INSTRUCTOR_INCOME } = profileEndpoints;

export const getEnrolledCourses = async ({ token }) => {
  let courses;
  let courseProgress;
  const response = await apiConnector('GET', GET_ENROLLED_COURSES, null, {
    Authorization: `Bearer ${token}`
  });
  console.log('get Enrolled course ka response---->', response);
  courses = response.data.data;
  courseProgress = {
    values: response.data.courseProgressValues,
    courseProgress: response.data.courseProgress
  };
  return { courses, courseProgress };
};

export const getInstructorIncome = async ({ token }) => {
  let income;
  let courseData;
  const response = await apiConnector(
    'GET',
    GET_INSTRUCTOR_INCOME,
    {},
    {
      Authorization: `Bearer ${token}`
    }
  );
  console.log('ress', response);
  income = response.data.totalIncome;
  courseData = response.data.courseData;
  return { income, courseData };
};
