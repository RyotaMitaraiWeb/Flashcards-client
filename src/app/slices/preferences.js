import { createSlice } from '@reduxjs/toolkit';

const preferenceSlice = createSlice({
    name: 'preferences',
    initialState: {
        color: 'purple',
        theme: 'light',
        animation: 'vertical',
    },
    reducers: {
        updatePreference(state, action) {
            state.color = action.payload.color;
            state.theme = action.payload.theme;
            state.animation = action.payload.animation;
        },
        updateToDefaultPreferences(state) {
            state.color = 'purple';
            state.theme = 'light';
            state.animation = 'vertical';
        },
    }
});

export const { updatePreference, updateToDefaultPreferences } = preferenceSlice.actions;
const preferenceReducers = preferenceSlice.reducer;
export default preferenceReducers;