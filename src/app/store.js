import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/mobileMenu';
import preferenceReducers from './slices/preferences';
import userReducer from './slices/user';

export const store = configureStore({
    reducer: {
        modal: reducer,
        user: userReducer,
        preferences: preferenceReducers,
    },
});
