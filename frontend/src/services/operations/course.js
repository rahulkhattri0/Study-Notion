import toast from 'react-hot-toast';
import { setCourse, setStep } from '../../redux/slices/courseSlice';
import { setUser } from '../../redux/slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { courseEndPoints } from '../apis';

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
  ADD_SUBSECTION_TO_COURSE_PROGRESS,
  GET_AUTH_COURSE_DETAILS
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
    dispatch(setStep(2));
    toast.success('Course created successfully');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
};

export const addSection = async ({ sectionName, courseId, token, dispatch, course }) => {
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
  const data = response.data.data;
  dispatch(
    setCourse({
      ...course,
      courseContent: [...course.courseContent, data]
    })
  );
};

export const updateSection = async ({
  sectionId,
  sectionName,
  courseId,
  token,
  dispatch,
  course
}) => {
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
  const data = response.data.data;
  const newCourseContent = course.courseContent.map((section) =>
    section._id === sectionId ? data : section
  );
  dispatch(
    setCourse({
      ...course,
      courseContent: newCourseContent
    })
  );
  toast.success('Section Updated');
};

export async function deleteSection({ sectionId, courseId, token, dispatch, course }) {
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
  const newContent = course.courseContent.filter((content) => content._id !== sectionId);
  dispatch(
    setCourse({
      ...course,
      courseContent: newContent
    })
  );
  toast.success('section deleted');
}

export async function addsubsection({ formdata, token, dispatch, course }) {
  const response = await apiConnector('POST', ADD_SUBSECTION, formdata, {
    Authorization: `Bearer ${token}`
  });
  console.log('addSubSection Ka response--->', response);
  const updatedSection = response.data.data;
  const updatedContent = course.courseContent.map((section) =>
    section._id === updatedSection._id ? updatedSection : section
  );
  dispatch(
    setCourse({
      ...course,
      courseContent: updatedContent
    })
  );
  toast.success('Subsection created');
}

export async function editsubsection({ formdata, token, dispatch, course }) {
  const response = await apiConnector('POST', UPDATE_SUBSECTION, formdata, {
    Authorization: `Bearer ${token}`
  });
  console.log('updatesubsection Ka response--->', response);
  const updatedSection = response.data.data;
  const updatedContent = course.courseContent.map((section) =>
    section._id === updatedSection._id ? updatedSection : section
  );
  dispatch(
    setCourse({
      ...course,
      courseContent: updatedContent
    })
  );
  toast.success('Subsection updated');
}

export async function deleteSubSection({ sectionId, subSectionId, token, dispatch, course }) {
  const response = await apiConnector(
    'POST',
    DELETE_SUBSECTION,
    {
      sectionId,
      subSectionId,
      courseId: course._id
    },
    {
      Authorization: `Bearer ${token}`
    }
  );
  console.log('deletesubsection Ka response--->', response);
  const updatedContent = course.courseContent.map((content) => {
    if (content._id === sectionId) {
      const newSubsections = content.subSection.filter((element) => element._id !== subSectionId);
      return {
        ...content,
        subSection: newSubsections
      };
    }
    return content;
  });
  dispatch(
    setCourse({
      ...course,
      courseContent: updatedContent
    })
  );
  toast.success('Subsection deleted');
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

export async function getInstructorCourses({ token }) {
  let data;
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

export async function addSubSectionToCourseProgress(
  data,
  token,
  setCompletedVideos,
  completedVideo,
  completedVideos
) {
  const loading = toast.loading('Loading...');
  try {
    const response = await apiConnector('POST', ADD_SUBSECTION_TO_COURSE_PROGRESS, data, {
      Authorization: `Bearer ${token}`
    });
    console.log('add to course progress ka repsonse -----> ', response);
    setCompletedVideos([...completedVideos, completedVideo]);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loading);
}

export async function getCourseDetails({ courseId }) {
  let data;
  const response = await apiConnector('POST', GET_COURSE_DETAILS, {
    courseId
  });
  console.log('get course details ka response--->', response);
  data = response.data.data[0];
  return data;
}

export async function getAuthCourseDetails({ courseId, token }) {
  let course;
  const response = await apiConnector(
    'POST',
    GET_AUTH_COURSE_DETAILS,
    {
      courseId
    },
    {
      Authorization: `Bearer ${token}`
    }
  );
  console.log('get auth course details ka response--->', response);
  course = response.data.data[0];
  const courseProgress = response.data.courseProgress;
  return { course, courseProgress };
}
