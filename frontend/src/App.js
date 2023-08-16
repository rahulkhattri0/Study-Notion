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
function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
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
        <Route path="dashboard" element={
        <PrivateRoute>
          <Dashboard/>
        </PrivateRoute>
        }>
            <Route path="my-profile" element={<MyProfile/>}/>
            <Route path="settings" element={<Settings/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
