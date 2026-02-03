// modules/authorization/store/authorizationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccessToken } from '../types/accessToken';
import { AuthenticatorType } from '../types/authenticatorType';
import { User } from '../types/user';
import { loginThunk, logoutThunk, refreshTokenThunk, restoreTokenThunk } from './authThunks';

interface AuthorizationState {
  token: AccessToken | null;
  authenticatorType: AuthenticatorType;
  user: User | null;
  roles: string[] | null;
  isLoading: boolean;
  isRestoring: boolean;
}

const initialState: AuthorizationState = {
  token: null,
  authenticatorType: null,
  user: null,
  roles: null,
  isLoading: false,
  isRestoring: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<AccessToken | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // ----------------- Login -----------------
      .addCase(loginThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.authenticatorType = action.payload.authenticatorType;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.roles = action.payload.roles;
        state.isLoading = false;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.isLoading = false;
      });

    builder
      // ----------------- Refresh Token -----------------
      .addCase(refreshTokenThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(refreshTokenThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.roles = action.payload.roles;
        state.isLoading = false;
      })
      .addCase(refreshTokenThunk.rejected, (state, action) => {
        state.isLoading = false;
      });

    // ----------------- Restore -----------------
    builder
      .addCase(restoreTokenThunk.pending, state => {
        state.isRestoring = true;
      })
      .addCase(restoreTokenThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.authenticatorType = action.payload.authenticatorType;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.roles = action.payload.roles;
        }
        state.isRestoring = false;
      })
      .addCase(restoreTokenThunk.rejected, state => {
        state.isRestoring = false;
      })

      // ----------------- Logout -----------------
      .addCase(logoutThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.token = null;
        state.user = null;
        state.authenticatorType = null;
        state.roles = null;
        state.isLoading = false;
      })
      .addCase(logoutThunk.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
