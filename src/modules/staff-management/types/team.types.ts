import { BaseModel } from "@/core/model/baseModel";
import { EmployeeModel } from "./employee.types";

export interface TeamModel extends BaseModel {
  code: string;
  name: string;
  employeeCount: number;
  employees: EmployeeModel[];
}

export interface TeamAddModel {
  name: string;
  personelIds: string[];
}

export interface TeamUpdateModel {
  name: string;
  personelIds: string[];
  createdDate: string;
}
