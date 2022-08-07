import { createSlice } from '@reduxjs/toolkit';

const preferenceSlice = createSlice({
    name: 'preferences',
    initialState: {
        colorTheme: 'purple',
        theme: 'light',
        animation: 'vertical',
    },
    reducers: {
        updatePreference(state, action) {
            state.colorTheme = action.payload.colorTheme;
            state.theme = action.payload.theme;
            state.animation = action.payload.animation;
        },
        updateToDefaultPreferences(state) {
            state.colorTheme = 'purple';
            state.theme = 'light';
            state.animation = 'vertical';
        },
    }
});

export const { updatePreference, updateToDefaultPreferences } = preferenceSlice.actions;
const preferenceReducers = preferenceSlice.reducer;
export default preferenceReducers;