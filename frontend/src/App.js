import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OpenRoute from "./components/core/auth/OpenRoute";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerfiyEmail from "./pages/VerfiyEmail";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import Settings from "./components/Dashboard/Settings/Settings";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/EnrolledCourses/EnrolledCourses";
import Course from "./pages/Course";
import InstructorCourses from "./components/Dashboard/Instructor_courses/InstructorCourses";
import EditCourse from "./pages/EditCourse";
import Catalog from "./pages/Catalog";
import CoursePage from "./pages/CoursePage";
import { useEffect } from "react";
import { profileEndpoints } from "./services/apis";
import { apiConnector } from "./services/apiConnector";
import toast from "react-hot-toast";
import { setToken } from "./redux/slices/authSlice";
import { setUser } from "./redux/slices/profileSlice";
import { resetCart } from "./redux/slices/cartSlice";
import UserCart from "./pages/UserCart";
import { ACCOUNT_TYPE } from "./utils/constants";
import Error from "./pages/Error";
import ViewCourse from "./pages/ViewCourse";


function App() {
  const token = useSelector((store)=>store.auth.token)
  const dispatch = useDispatch()
  async function getUserDetails(){
    try {
      await apiConnector(
        "GET",
        GET_USER_DETAILS,
        {},
        {
          Authorization: `Bearer ${token}`
        }
      )
    } catch (error) {
      toast.error("Could not fetch user details!")
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(resetCart())
    }
  }
  const { GET_USER_DETAILS } = profileEndpoints
  const user = useSelector((store)=>store.profile.user)
  useEffect(()=>{
    getUserDetails()
  },[])
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/catalog/:cat_id" element={<Catalog/>}/>
        <Route path="/login" element={
          <OpenRoute>
            <Login/>
          </OpenRoute>
        }/>
        <Route path="/signUp" element={
        <OpenRoute>
          <SignUp/>
        </OpenRoute>
        }/>
        <Route path="/forgot-password" element={
        <OpenRoute>
          <ResetPassword/>
        </OpenRoute>
        }/>
        <Route path="update-password/:id" element={
        <OpenRoute>
          <UpdatePassword/>
        </OpenRoute>
        }/>
         <Route path="verify-email" element={
        <OpenRoute>
          <VerfiyEmail/>
        </OpenRoute>
        }/>
        { user && user.accountType===ACCOUNT_TYPE.STUDENT && 
          <Route path="/cart" element={
            <PrivateRoute>
              <UserCart/>
            </PrivateRoute>
          }/>
        }
        
        <Route path="dashboard" element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
        }>
            <Route path="my-profile" element={<MyProfile/>}/>
            <Route path="settings" element={<Settings/>}/>
            {
              user && user.accountType===ACCOUNT_TYPE.STUDENT && (
                <Route path="enrolled-courses" element={<EnrolledCourses/>}/>
              )
            }
            {
              user && user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="add-course" element={<Course/>}/>
                  <Route path="my-courses" element={<InstructorCourses/>}/>
                  <Route path="edit-course" element={<EditCourse/>}/>
                </> 
              )
            }
        </Route>
        {
          user && user.accountType === ACCOUNT_TYPE.STUDENT && <Route path = "/viewCourse/:id" element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }/>
        }
        
        <Route path="/course_details/:id" element={<CoursePage/>}/>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
