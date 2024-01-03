import toast from 'react-hot-toast';
import { courseEndPoints } from '../apis';
import { apiConnector } from '../apiConnector';
import { setCourse } from '../../redux/slices/courseSlice';
import { setUser } from '../../redux/slices/profileSlice';
import { setViewCourse } from '../../redux/slices/viewCourseSlice';

const {
  CREATE_COURSE,
  ADD_SECTION,
  UPDATE_SECTION,
  DELETE_SECTION,
  ADD_SUBSECTION,
  UPDATE_SUBSECTION,
  DELETE_SUBSECTION,
  PUBLISH_COURSE,
  GET_INSTRUCTOR_COURSES,
  EDIT_COURSE,
  GET_COURSE_DETAILS,
  ADD_SUBSECTION_TO_COURSE_PROGRESS
} = courseEndPoints;
export const createCourse = async (data, token, dispatch, user) => {
  const loadingToast = toast.loading('Loading...');
  try {
    const reponse = await apiConnector('POST', CREATE_COURSE, data, {
      Authorization: `Bearer ${token}`
    });
    console.log('Create course response---->', reponse);
    const course = reponse.data.data;
    dispatch(setCourse(course));
    const newUser = {
      ...user,
      courses: [...user.courses, course._id]
    };
    dispatch(setUser(newUser));
    toast.success('Course created successfully');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
};

export const addSection = async (sectionName, courseId, token) => {
  const loadingToast = toast.loading('Loading...');
  let data;
  try {
    const response = await apiConnector(
      'POST',
      ADD_SECTION,
      {
        sectionName: sectionName,
        courseId: courseId
      },
      {
        Authorization: `Bearer ${token}`
      }
    );
    console.log('add section ka response-->', response);
    toast.success('Section created');
    data = response.data.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return data;
};

export const updateSection = async (sectionId, sectionName, courseId, token) => {
  const loadingToast = toast.loading('Loading...');
  let data;
  try {
    const response = await apiConnector(
      'POST',
      UPDATE_SECTION,
      {
        sectionName: sectionName,
        sectionId: sectionId,
        courseId: courseId
      },
      {
        Authorization: `Bearer ${token}`
      }
    );
    console.log('edit section ka response-->', response);
    data = response.data.data;
    toast.success('Section Updated');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return data;
};

export async function deleteSection(sectionId, courseId, token) {
  const loadingToast = toast.loading('Loading...');
  try {
    const response = await apiConnector(
      'POST',
      DELETE_SECTION,
      {
        sectionId: sectionId,
        courseId: courseId
      },
      {
        Authorization: `Bearer ${token}`
      }
    );
    console.log('delete section response---->', response);
    toast.success('section deleted');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
}

export async function addsubsection(data, token) {
  const loadingToast = toast.loading('Loading...');
  let resData;
  try {
    const response = await apiConnector('POST', ADD_SUBSECTION, data, {
      Authorization: `Bearer ${token}`
    });
    console.log('addSubSection Ka response--->', response);
    resData = response.data.data;
    toast.success('Subsection created');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return resData;
}

export async function editsubsection(data, token) {
  const loadingToast = toast.loading('Loading...');
  let resData;
  try {
    const response = await apiConnector('POST', UPDATE_SUBSECTION, data, {
      Authorization: `Bearer ${token}`
    });
    console.log('updatesubsection Ka response--->', response);
    resData = response.data.data;
    toast.success('Subsection updated');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return resData;
}

export async function deleteSubSection(sectionId, subSectionId, token) {
  const loadingToast = toast.loading('Loading...');
  try {
    const response = await apiConnector(
      'POST',
      DELETE_SUBSECTION,
      {
        sectionId,
        subSectionId
      },
      {
        Authorization: `Bearer ${token}`
      }
    );
    console.log('deletesubsection Ka response--->', response);
    toast.success('Subsection deleted');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
}

export async function publishCourse(courseId, categoryId, token) {
  const loadingToast = toast.loading('Loading...');
  try {
    const response = await apiConnector(
      'PUT',
      PUBLISH_COURSE,
      {
        courseId: courseId,
        category: categoryId
      },
      {
        Authorization: `Bearer ${token}`
      }
    );
    console.log('publish course res-->', response);
    toast.success('Course published!');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
}

export async function getInstructorCourses(token) {
  const loadingToast = toast.loading('Loading...');
  let data;
  try {
    const response = await apiConnector(
      'GET',
      GET_INSTRUCTOR_COURSES,
      {},
      {
        Authorization: `Bearer ${token}`
      }
    );
    console.log('getInstructorCourses ka response--->', response);
    data = response.data.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return data;
}

export async function editCourseInformation(formData, token) {
  const loadingToast = toast.loading('Loading...');
  let data;
  try {
    const response = await apiConnector('PUT', EDIT_COURSE, formData, {
      Authorization: `Bearer ${token}`
    });
    console.log('edit course ka response--->', response);
    data = response.data.data;
    toast.success('Course Information Edited');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return data;
}

export async function addSubSectionToCourseProgress(data, token, dispatch, course) {
  const loading = toast.loading('Loading...');
  try {
    const response = await apiConnector('POST', ADD_SUBSECTION_TO_COURSE_PROGRESS, data, {
      Authorization: `Bearer ${token}`
    });
    console.log('add to course progress ka repsonse -----> ', response);
    dispatch(
      setViewCourse({
        ...course,
        courseProgress: {
          ...course.courseProgress,
          completedVideos: [...course.courseProgress.completedVideos, data.subSectionId]
        }
      })
    );
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loading);
}

export async function getCourseDetails(courseId) {
  console.log('in function', courseId);
  const loadingToast = toast.loading('Loading...');
  let data;
  try {
    const response = await apiConnector('POST', GET_COURSE_DETAILS, {
      courseId: courseId
    });
    console.log('get course details ka response--->', response);
    data = response.data.data[0];
    toast.success('Course Details Fetched');
  } catch (error) {
    console.log(error);
    toast.error(error.reponse.data.message);
  }
  toast.dismiss(loadingToast);
  return data;
}
