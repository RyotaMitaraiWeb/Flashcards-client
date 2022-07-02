import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/mobileMenu';


export const store = configureStore({
  reducer: {
    modal: reducer
  },
});
