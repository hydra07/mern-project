import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, UserState } from '../interface';
const api = 'http://localhost:8000/api/';

const initialState: UserState = {
  currentUser: null,
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
        console.log('pending action register');
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload as User;
        state.message = action.payload;
      })
      .addCase(login.pending, () => {
        // state.loading = true;
        console.log('pending action login');
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload as User;
        console.log(state.currentUser);
        state.message = action.payload;
      })
      .addCase(logout.pending, () => {
        // state.loading = true;
        console.log('pending action logout');
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = null;
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
export const login = createAsyncThunk(
  'user/login',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api}users/signin`, user);
      console.log('response', response.data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const logout = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api}users/signout`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const {} = userSlice.actions;

export default userSlice.reducer;
