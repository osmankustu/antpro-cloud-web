import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../types/jwt/jwtPayload';

type DecodedJwt = JwtPayload & {
  exp?: number;
  [key: string]: any;
};

export const TokenService = {
  decodeToken(token: string | null): DecodedJwt | null {
    if (!token) return null;

    try {
      return jwtDecode<DecodedJwt>(token);
    } catch (err) {
      console.log('TokenService.decodeToken error:', err);
      return null;
    }
  },

  isTokenExpired(token: string | null): boolean {
    const decodedJwt = TokenService.decodeToken(token);
    if (!decodedJwt || !decodedJwt.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedJwt.exp < currentTime;
  },

  getUserRoles(token: string | null): string[] {
    const decodedJwt = TokenService.decodeToken(token);
    const roles = decodedJwt?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (!roles) return [];

    return Array.isArray(roles) ? roles : [roles];
  },

  hasRole(token: string | null, role: string): boolean {
    const roles = TokenService.getUserRoles(token);
    return roles.includes(role);
  },
};
