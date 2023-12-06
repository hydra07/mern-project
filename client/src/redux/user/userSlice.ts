import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import env from '../../utils/validateEnv';
import { User, UserState } from '../interface';
const initialState: UserState = {
  currentUser: null,
  loading: false,
  message: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    showError: (state) => {
      if (state.error) {
        toast.error(state.error);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      //-----------google--------------
      .addCase(google.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(google.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user as User;
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        if (state.message) {
          toast.success(state.message);
        }
      })
      .addCase(google.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.parse(JSON.stringify(action.payload)).error;
        if (state.error) {
          toast.error(state.error);
        }
      })
      //-----------register--------------
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user as User;
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        if (state.message) {
          toast.success(state.message);
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.parse(JSON.stringify(action.payload)).error;
        if (state.error) {
          toast.error(state.error);
        }
      })
      //-----------login--------------
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload as User;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.parse(JSON.stringify(action.payload)).error;
        if (state.error) {
          toast.error(state.error);
        }
      })
      //-----------logout--------------
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = null;
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        if (state.message) {
          toast.success(state.message);
        }
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = JSON.parse(JSON.stringify(action.payload)).error;
        if (state.error) {
          toast.error(state.error);
        }
      });
  },
});
export const google = createAsyncThunk(
  'user/google',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${env.VITE_API}users/google`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${env.VITE_API}users/signup`, user);
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
      const response = await axios.post(`${env.VITE_API}users/signin`, user);
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
      const response = await axios.get(`${env.VITE_API}users/signout`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const { clearError, showError } = userSlice.actions;

export default userSlice.reducer;
