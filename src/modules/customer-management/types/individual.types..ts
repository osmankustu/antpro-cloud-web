import { BaseModel } from '@/core/model/baseModel';
import { BaseCustomer } from './base/baseCustomer';

export interface IndividualCustomerModel extends BaseCustomer, BaseModel {
  firstName: string;
  lastName: string;
}

export interface IndividualCustomerSelectModel {
  id: string;
  customerNo: string;
  firstName: string;
  lastName: string;
  fullName: string;
}

export interface IndividualCustomerAddModel {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}

export interface IndividualCustomerUpdateModel {
  id: string;
  customerNo: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  createdDate: string;
}
