import { BaseModel } from '@/core/model/baseModel';

export interface ServiceModel extends BaseModel {
  code: string;
  title: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  customerId: string;
  customerName?: string;
  customerType: string;
  assignmentId: string;
  address: ServiceAddressModel;
  poolId: string;
  employeeId?: string;
  teamId?: string;
}

export interface ServiceAddModel {
  title: string;
  subject: string;
  description: string;
  priority: string;
  customerId: string;
  customerType?: string;
  employeeId: string;
  teamId: string;
  address: ServiceAddress;
  //Not Processing To Backend
  addressType: string;
  assignmentType: string;
}
export interface ServiceUpdateModel {
  id: string;
  code: string;
  title: string;
  subject: string;
  description: string;
  priority: string;
  customerId: string;
  customerType?: string;
  employeeId: string;
  teamId: string;
  address: ServiceAddress;
  createdDate: string;
  //Not Processing To Backend
  addressType: string;
  assignmentType: string;
}

interface ServiceAddress {
  addressId?: string | null;
  cityId: number;
  stateId: number;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

interface ServiceAddressModel {
  id: string;
  addressId: string | null | undefined;
  cityId: number;
  stateId: number;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  navigationUrl: string;
}
