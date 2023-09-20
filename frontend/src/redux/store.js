import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import profileSlice from './slices/profileSlice'
import cartSlice from './slices/cartSlice'
import categorySlice from './slices/categorySlice'
import courseSlice from './slices/courseSlice'

export const store = configureStore({
  reducer: {
    auth : authSlice,
    profile:profileSlice,
    cart:cartSlice,
    category : categorySlice,
    course : courseSlice
  }
})