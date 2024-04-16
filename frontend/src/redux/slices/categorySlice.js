import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';

const initialState = {
  categories: null,
  status: 'idle'
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  },
  extraReducers: (builder) =>
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.status = 'error';
      })
});

const { CATEGORIES_API } = categories;

export const getAllCategories = createAsyncThunk('category/getAllCategories', async () => {
  const result = await apiConnector('GET', CATEGORIES_API);
  console.log('printing categories', result);
  return result.data.data;
});

export default categorySlice.reducer;
export const { setCategories } = categorySlice.actions;
