import { AccessToken } from '../accessToken';
import { AuthenticatorType } from '../authenticatorType';

export interface LoginResponse {
  accessToken: AccessToken | null;
  requiredAuthenticatorType: AuthenticatorType;
}
