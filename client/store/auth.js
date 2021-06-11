import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload.isRemember) {
        console.log(action.payload);
        localStorage.setItem('token', action.payload.token);
      }
      state.currentUser = {user: action.payload.email, token: action.payload.token};
    },
    logout: (state) => {
      localStorage.removeItem('token');
      state.currentUser = null;
    }
  }
});

export const {login, logout} = authSlice.actions;

export const selectUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
