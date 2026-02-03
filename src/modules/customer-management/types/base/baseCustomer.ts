import { BaseModel } from '../../../../core/model/baseModel';

export interface BaseCustomer extends BaseModel {
  customerNo: string;
  phoneNumber: string;
  email: string;
  fullName: string;
  customerCount: number;
}
