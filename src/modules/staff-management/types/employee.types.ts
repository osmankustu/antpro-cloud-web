import { BaseModel } from '@/core/model/baseModel';

export interface EmployeeModel extends BaseModel {
  code: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  email: string;
  birthDate: string;
  hireDate: string;
  position: string;
  department: string;
  departmentId: number;
  isActive: boolean;
}

export interface EmployeeAddModel {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string | undefined;
  hireDate: string | undefined;
  isActive: boolean;
  position: string;
  departmentId: number | null;
}

export interface EmployeeUpdateModel {
  id: string;
  code: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthDate: string;
  hireDate: string;
  position: string;
  departmentId: number;
  isActive: boolean;
  createdDate: string;
}
