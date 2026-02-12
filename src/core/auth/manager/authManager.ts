import { rootStore } from '@/core/store/base/rootStore';
import { AuthService } from '../service/authService';
import { TokenService } from '../service/tokenService';
import { AccessToken } from '../types/accessToken';

import { setToken } from '../store/authSlice';
import { LoginRequest } from '../types/requests/loginRequest';
import { LoginResponse } from '../types/responses/loginResponse';
import { AuthThunkResponse } from '../types/thunkResponse/AuthThunkResponse';
import { RefreshThunkResponse } from '../types/thunkResponse/refreshThunkResponse';
import { User } from '../types/user';

export const AuthManager = {
  login: async (credentials: LoginRequest): Promise<AuthThunkResponse> => {
    try {
      const res = await AuthService.login(credentials);
      const response = res.data as LoginResponse;

      if (!response.accessToken) {
        return {
          accessToken: null,
          authenticatorType: null,
          roles: null,
          user: null,
        };
      }
      rootStore.dispatch(setToken(response.accessToken));
      const me = (await AuthService.me()).data;
      const info = (await AuthService.myInfo()).data;
      const user: User = { ...me, ...info, employeeId: info.id };

      const roles = await TokenService.getUserRoles(response.accessToken.token);

      return {
        accessToken: response.accessToken,
        authenticatorType: response.requiredAuthenticatorType,
        roles,
        user,
      };
    } catch (error) {
      console.log('AuthManager-Login', error);
      return {
        accessToken: null,
        authenticatorType: null,
        roles: null,
        user: null,
      };
    }
  },

  refresh: async (currentToken: string): Promise<RefreshThunkResponse> => {
    try {
      const res = await AuthService.refresh();
      const accessToken = res.data as AccessToken;

      if (!accessToken) {
        return { token: null, roles: null };
      }

      const roles = TokenService.getUserRoles(accessToken.token);

      return { token: accessToken, roles };
    } catch (error) {
      console.log('AuthManager-Refresh', error);
      return { token: null, roles: null };
    }
  },

  restore: async (persistedToken: AccessToken | null): Promise<AuthThunkResponse> => {
    if (!persistedToken?.token) {
      return {
        accessToken: null,
        authenticatorType: 'None',
        roles: null,
        user: null,
      };
    }

    try {
      const tokenExpired = await TokenService.isTokenExpired(persistedToken.token);

      if (tokenExpired) {
        return {
          accessToken: null,
          authenticatorType: null,
          roles: null,
          user: null,
        };
      }

      const me = (await AuthService.me()).data;
      const info = (await AuthService.myInfo()).data;
      const user: User = { ...me, ...info };

      const roles = await TokenService.getUserRoles(persistedToken.token);

      return {
        accessToken: persistedToken,
        authenticatorType: 'None',
        roles,
        user,
      };
    } catch (err) {
      return {
        accessToken: null,
        authenticatorType: null,
        roles: null,
        user: null,
      };
    }
  },

  logout: async () => {
    const token = rootStore.getState().auth.token?.token;
    try {
      await AuthService.revoke();
    } catch {
      // swallow
    }
  },
};
