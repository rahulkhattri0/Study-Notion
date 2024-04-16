import { toast } from 'react-hot-toast';
import { settingsEndpoints } from '../apis';
import { apiConnector } from '../apiConnector';
import { setUser } from '../../redux/slices/profileSlice';
import { logout } from './auth';
const { UPDATE_PROFILE, CHANGE_PASSWORD, DELETE_PROFILE, UPDATE_PROFILE_PICTURE } =
  settingsEndpoints;

export const updateProfile = (data, dispatch, token, user) => {
  return async () => {
    const response = await apiConnector('PUT', UPDATE_PROFILE, data, {
      Authorization: `Bearer ${token}`
    });
    const updated = response.data.profileDetails;
    console.log('updated....', updated);
    const updatedUser = {
      ...user,
      additionalDetails: updated
    };
    dispatch(setUser(updatedUser));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated');
    console.log('upodate profile aka response-->', response);
  };
};

export const changePassword = (data, token) => {
  return async () => {
    const response = await apiConnector('POST', CHANGE_PASSWORD, data, {
      Authorization: `Bearer ${token}`
    });
    console.log('CHANGE PASSWORD KA RESPONSE--->', response);
    toast.success('password changed successfully');
  };
};

export const deleteProfile = (token, dispatch, navigate) => {
  return async () => {
    logout(dispatch, navigate);
    const response = await apiConnector('DELETE', DELETE_PROFILE, null, {
      Authorization: `Bearer ${token}`
    });
    console.log('DELETE PROFILE KA REPOSNSE---->', response);
    toast.success('Profile deleted successfully');
  };
};

export const updateProfilePicture = (token, formData, dispatch) => {
  return async () => {
    const response = await apiConnector('PUT', UPDATE_PROFILE_PICTURE, formData, {
      Authorization: `Bearer ${token}`
    });
    console.log('update profile pic ka response---->', response);
    const newUser = response.data.data;
    console.log('newUser', newUser);
    dispatch(setUser(newUser));
    localStorage.setItem('user', JSON.stringify(newUser));
  };
};
