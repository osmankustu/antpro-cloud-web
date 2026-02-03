export type JwtPayload = {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string[];
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/name': string;
  EmployeeId: string;
};
