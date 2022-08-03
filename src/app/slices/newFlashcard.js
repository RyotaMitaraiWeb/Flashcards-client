import { createSlice } from '@reduxjs/toolkit';

const newFlashcardSlice = createSlice({
    name: 'newFlashcard',
    initialState: {
        title: '',
        description: '',
    },

    reducers: {
        updateBasicInfo(state, action) {
            state.title = action.payload.title;
            state.description = action.payload.description;
        },

        restartBasicInfo(state) {
            state.title = '';
            state.description = '';
        },
    }
});

export const { updateBasicInfo, restartBasicInfo } = newFlashcardSlice.actions;
const flashcardReducer = newFlashcardSlice.reducer;
export default flashcardReducer;