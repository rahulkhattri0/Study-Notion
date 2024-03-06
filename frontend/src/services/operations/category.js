import { apiConnector } from '../apiConnector';
import { categories } from '../apis';
import { setCategories } from '../../redux/slices/categorySlice';

const { GET_CATEGORY_DETAILS, CATEGORIES_API } = categories;

export const getCategoryDetails = async (categoryId) => {
  let data;
  const response = await apiConnector('POST', GET_CATEGORY_DETAILS, {
    categoryId: categoryId
  });
  console.log('response of category details--->', response);
  data = response.data.data;
  return data;
};

export const getAllCategories = async (dispatch) => {
  const result = await apiConnector('GET', CATEGORIES_API);
  console.log('printing categories', result);
  dispatch(setCategories(result.data.data));
  return result.data.data;
};
