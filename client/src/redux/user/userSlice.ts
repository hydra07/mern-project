import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserState } from '../interface';
const api = 'http://localhost:8000/api/';

const initialState: UserState = {
  currentUser: null,
  error: null,
  loading: false,
  message: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, () => {
        // state.loading = true;
        console.log('pending action');
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser += action.payload;
        state.message = action.payload;
      });
  },
});
export const register = createAsyncThunk(
  'user/register',
  async (user: User, { rejectWithValue }) => {
    try {
      // console.log('user', user);
      const response = await axios.post(`${api}users/signup`, user);
      // console.log('response', response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const {} = userSlice.actions;

export default userSlice.reducer;
