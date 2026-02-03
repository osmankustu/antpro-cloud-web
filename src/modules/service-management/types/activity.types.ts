import { BaseModel } from "@/core/model/baseModel";

export interface ActivityModel extends BaseModel {
  poolId: string;
  serviceId: string;
  employeeId: string;
  employeeFullName?: string | null;
  description: string;
  status: string;
}

export interface ActivityAddModel {
  poolId: string;
  employeeId: string;
  description: string;
  status: string;
}

export interface ActivityFormModel {
  poolId: string;
  employeeId: string;
  description: string;
  status: string;
  serviceId?: string;
  files?: [];
}

export interface ActivityUpdateFormModel {
  id: string;
  poolId: string;
  employeeId: string;
  description: string;
  status: string;
  serviceId?: string;
  files?: [];
  createdDate: string;
}
export interface ActivityUpdateModel {
  id: string;
  poolId: string;
  employeeId: string;
  description: string;
  status: string;
  createdDate: string;
}
