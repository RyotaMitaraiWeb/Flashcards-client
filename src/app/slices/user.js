import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        id: '',
    },
    reducers: {
        updateUser(state, action) {
            state.username = action.payload.username;
            state.id = action.payload.id;
        },
        logout(state) {
            state.username = '';
            state.id = '';
        }
    }
});

export const { updateUser, logout } = userSlice.actions;
// export const user = state => state.user.username;

const userReducer = userSlice.reducer;
export default userReducer;