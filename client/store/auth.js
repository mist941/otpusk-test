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
        localStorage.setItem('token', action.payload.token)
      }
      state.currentUser = action.payload.email;
    }
  }
});

export const {login} = authSlice.actions;

export const selectUser = (state) => state.auth.currentUser;

export default authSlice.reducer;
