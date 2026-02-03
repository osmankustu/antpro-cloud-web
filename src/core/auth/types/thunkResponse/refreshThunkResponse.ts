import { AccessToken } from '../accessToken';

export interface RefreshThunkResponse {
  token: AccessToken | null;
  roles: string[] | null;
}
