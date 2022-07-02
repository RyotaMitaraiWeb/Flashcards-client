import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isToggled: false,
    },
    reducers: {
        toggleModal(state, action) {
            state.isToggled = action.payload;
        }
    }
});

export const { toggleModal } = modalSlice.actions;
export const isToggled = state => state.modal.isToggled;
export default modalSlice.reducer;