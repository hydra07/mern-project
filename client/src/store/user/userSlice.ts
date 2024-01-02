import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { RootState } from '..';
import axiosInstance from '../../config/axios';
import { User, UserState } from '../interface';

const initialState: UserState = {
  loading: false,
  message: null,
  error: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
        // state.currentUser = action.payload.user as User;
        // console.log('user', state.currentUser);
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        if (state.message) {
          toast.success(state.message);
        }
        state.token = action.payload.token;
        console.log('token', state.token);
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
        // state.currentUser = action.payload.user as User;
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        if (state.message) {
          toast.success(state.message);
        }
        state.token = action.payload.token;
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
        // state.currentUser = action.payload as User;
        state.token = action.payload.token;
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
        // state.currentUser = null;
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        state.token = null;
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
      })
      //-----------profile--------------
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        // state.currentUser = action.payload.user as User;
        state.message = JSON.parse(JSON.stringify(action.payload)).message;
        if (state.message) {
          toast.success(state.message);
        }
        state.error = JSON.parse(JSON.stringify(action.payload)).error;
        if (state.error) {
          toast.error(state.error);
        }
      })
      .addCase(profile.rejected, (state, action) => {
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
  async (user: User, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosInstance(state.user.token as string);
      const response = await axios.post(`users/google`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const register = createAsyncThunk(
  'user/register',
  async (user: User, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosInstance(state.user.token as string);
      const response = await axios.post(`users/signup`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const login = createAsyncThunk(
  'user/login',
  async (user: User, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosInstance(state.user.token as string);
      const response = await axios.post(`users/signin`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  const { rejectWithValue, getState } = thunkAPI;
  const state = getState() as RootState;
  try {
    const axios = axiosInstance(state.user.token as string);
    const response = await axios.get(`users/signout`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const profile = createAsyncThunk(
  'user/profile',
  async (user: User, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosInstance(state.user.token as string);
      const response = await axios.post(`/users/profile`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const state = getState() as RootState;
    try {
      const axios = axiosInstance(state.user.token as string);
      const response = await axios.get(`users/profile`);
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const {} = userSlice.actions;

export default userSlice.reducer;
