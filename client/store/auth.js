import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
};

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
});

export default counterSlice.reducer;
