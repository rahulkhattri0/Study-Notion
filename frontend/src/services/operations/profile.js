import { apiConnector } from '../apiConnector';
import { profileEndpoints } from '../apis';

const { GET_ENROLLED_COURSES, GET_INSTRUCTOR_INCOME } = profileEndpoints;

export const getEnrolledCourses = (token) => {
  return async () => {
    let courses;
    const response = await apiConnector('GET', GET_ENROLLED_COURSES, null, {
      Authorization: `Bearer ${token}`
    });
    console.log('get Enrolled course ka response---->', response);
    courses = response.data.data;
    return courses;
  };
};

export const getInstructorIncome = (token) => {
  return async () => {
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
};
