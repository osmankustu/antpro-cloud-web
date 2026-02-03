import { AccessToken } from '../accessToken';
import { AuthenticatorType } from '../authenticatorType';
import { User } from '../user';

export interface AuthThunkResponse {
  accessToken: AccessToken | null;
  user: User | null;
  authenticatorType: AuthenticatorType | null;
  roles: string[] | null;
}
