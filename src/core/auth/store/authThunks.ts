import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthManager } from '../manager/authManager';
import { LoginRequest } from '../types/requests/loginRequest';
import { AuthThunkResponse } from '../types/thunkResponse/AuthThunkResponse';
import { RootState } from '@/core/store/base/rootStore';
import { RefreshThunkResponse } from '../types/thunkResponse/refreshThunkResponse';

// ---------------------
// Login Thunk
// ---------------------
export const loginThunk = createAsyncThunk(
  'auth/login',
  async (payload: LoginRequest, { rejectWithValue }) => {
    try {
      const loginResponse = await AuthManager.login(payload);
      return loginResponse;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// ---------------------
// Restore Token Thunk
// ---------------------
export const restoreTokenThunk = createAsyncThunk<AuthThunkResponse, void, { state: RootState }>(
  'auth/restore',
  async (_, { getState }) => {
    const token = getState().auth.token;
    const result = await AuthManager.restore(token);
    return result;
  },
);

// ---------------------
// Logout Thunk
// ---------------------
export const logoutThunk = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  await AuthManager.logout();
});

export const refreshTokenThunk = createAsyncThunk<RefreshThunkResponse, void, { state: RootState }>(
  'auth/refresh',
  async (_, { getState }) => {
    const token = getState().auth.token?.token;
    if (!token) return { token: null, roles: null };

    const result = await AuthManager.refresh(token);
    return result;
  },
);
