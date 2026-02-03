export interface User {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string;
  email: string;
  status: boolean;
  authenticatorType: number;
  position: string;
  department: string;
}
