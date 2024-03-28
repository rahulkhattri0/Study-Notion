import { apiConnector } from '../apiConnector';
import { categories } from '../apis';

const { GET_CATEGORY_DETAILS } = categories;

export const getCategoryDetails = async (categoryId) => {
  let data;
  const response = await apiConnector('POST', GET_CATEGORY_DETAILS, {
    categoryId: categoryId
  });
  console.log('response of category details--->', response);
  data = response.data.data;
  return data;
};
