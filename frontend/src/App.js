import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import OpenRoute from './components/core/auth/OpenRoute';
import ResetPassword from './pages/ResetPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerfiyEmail from './pages/VerfiyEmail';
import MyProfile from './components/Dashboard/MyProfile';
import Settings from './components/Dashboard/Settings/Settings';
import PrivateRoute from './components/core/auth/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import EnrolledCourses from './pages/EnrolledCourses';
import Course from './pages/Course';
import InstructorCourses from './components/Dashboard/Instructor_courses/InstructorCourses';
import EditCourse from './pages/EditCourse';
import CoursePage from './pages/CoursePage';
import { Suspense, lazy, useEffect } from 'react';
import UserCart from './pages/UserCart';
import { ACCOUNT_TYPE } from './utils/constants';
import Error from './pages/Error';
import ViewCourse from './pages/ViewCourse';
import InstructorIncome from './pages/InstructorIncome';
import { logout } from './services/operations/auth';
import Loader from './components/common/Loader';
import AppLayout from './pages/AppLayout.js';

const Dashboard = lazy(() => import('./pages/Dashboard.js'));
const ContactUs = lazy(() => import('./pages/ContactUs.js'));
const Catalog = lazy(() => import('./pages/Catalog.js'));

function App() {
  const dispatch = useDispatch();
  const tokenExpiryTime = useSelector((store) => store.auth.tokenExipryTime);
  console.log(tokenExpiryTime);
  const user = useSelector((store) => store.profile.user);
  useEffect(() => {
    if (Date.now() > tokenExpiryTime) {
      logout(dispatch);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route
          path="/contact"
          element={
            <Suspense fallback={<Loader />}>
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="/catalog/:cat_id"
          element={
            <Suspense fallback={<Loader />}>
              <Catalog />
            </Suspense>
          }
        />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signUp"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ResetPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerfiyEmail />
            </OpenRoute>
          }
        />
        {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <UserCart />
              </PrivateRoute>
            }
          />
        )}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            </PrivateRoute>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="settings" element={<Settings />} />
          {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route path="enrolled-courses" element={<EnrolledCourses />} />
          )}
          {user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<Course />} />
              <Route path="my-courses" element={<InstructorCourses />} />
              <Route path="edit-course" element={<EditCourse />} />
              <Route path="instructor" element={<InstructorIncome />} />
            </>
          )}
        </Route>
        {user && user.accountType === ACCOUNT_TYPE.STUDENT && (
          <Route
            path="/view-course/:id"
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          />
        )}
        <Route path="/course_details/:id" element={<CoursePage />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
