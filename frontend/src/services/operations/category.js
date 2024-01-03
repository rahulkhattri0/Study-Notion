import { apiConnector } from '../apiConnector';
import { categories } from '../apis';
import toast from 'react-hot-toast';

const { GET_CATEGORY_DETAILS } = categories;

export const getCategoryDetails = async (categoryId) => {
  let data;
  const loadingToast = toast.loading('Loading...');
  try {
    const response = await apiConnector('POST', GET_CATEGORY_DETAILS, {
      categoryId: categoryId
    });
    console.log('response of category details--->', response);
    data = response.data.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(loadingToast);
  return data;
};
