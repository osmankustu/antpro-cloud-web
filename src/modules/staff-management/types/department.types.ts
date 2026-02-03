export interface DepartmentModel {
  id: number;
  name: string;
  employeeCount: string;
  createdDate: string;
  updatedDate: string;
}

export interface DepartmentAddModel {
  name: string;
}

export interface DepartmentUpdateModel {
  id: number;
  name: string;
  createdDate: string;
}
