import axios from 'axios';
import toast from 'react-hot-toast';

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null
  });
};

export async function apiCaller(argsObj, fn, showLoadingToast) {
  let data;
  let loadingToast;
  if (showLoadingToast) loadingToast = toast.loading('Loading...');
  try {
    data = await fn(argsObj);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || 'Something Went Wrong...');
  }
  toast.dismiss(loadingToast);
  return data;
}
