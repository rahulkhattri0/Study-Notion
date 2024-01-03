import { setToken } from '../../redux/slices/authSlice';
import { resetCart } from '../../redux/slices/cartSlice';
import { setUser } from '../../redux/slices/profileSlice';
import { apiConnector } from '../apiConnector';
import { authEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const { LOGIN, SENDOTP, SIGNUP, RESETPASSWORDTOKEN, RESETPASSWORD } = authEndpoints;
//DONE
export const sendOtp = async (email, navigate, password) => {
  const toastID = toast.loading('Loading....');
  try {
    const response = await apiConnector('POST', SENDOTP, {
      email: email,
      password: password
    });
    console.log('OTP KA RESPONSE ------->', response);
    toast.success('OTP Sent Successfully');
    navigate('/verify-email');
  } catch (error) {
    console.log(error);
    console.log('yaha', error.response.data.success);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastID);
};
export const signUp = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  accountType,
  otp,
  navigate
) => {
  const toastID = toast.loading('Loading...');
  try {
    const response = await apiConnector('POST', SIGNUP, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      accountType: accountType,
      otp: otp
    });
    console.log('SIGNUP KA RESPONSE ------->', response);
    toast.success('sign up successfull');
    navigate('/login');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastID);
};

export const login = async (email, password, navigate, dispatch) => {
  const toastID = toast.loading('Loading....');
  try {
    const response = await apiConnector('POST', LOGIN, {
      email: email,
      password: password
    });
    console.log('LOGIN RESPONSE ------->', response);
    const token = response.data.token;
    const user = response.data.user;
    dispatch(setToken(token));
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify({ ...user }));
    dispatch(setUser({ ...user }));
    navigate('/dashboard/my-profile');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastID);
};

export const resetPasswordToken = async (email, setEmailSent) => {
  const toastID = toast.loading('Loading....');
  try {
    const response = await apiConnector('POST', RESETPASSWORDTOKEN, {
      email: email
    });
    console.log('RESET PASSWORD TOKEN KA RESPONSE------>', response);
    toast.success('Reset Password email sent');
    setEmailSent(true);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastID);
};

export const resetPassword = async (password, confirmPassword, token, navigate) => {
  const toastId = toast.loading('Loading...');
  try {
    const response = await apiConnector('POST', RESETPASSWORD, {
      password: password,
      confirmPassword: confirmPassword,
      token: token
    });
    console.log('RESET PASSWORD KA RESPONSE ----->', response);
    toast.success('Password reset successfully');
    navigate('/login');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
};

export const logout = (dispatch, navigate) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(resetCart());
  navigate('/');
  console.log('navigate here');
};
