import { BaseModel } from '@/core/model/baseModel';

export interface AddressModel extends BaseModel {
  id: string;
  title: string;
  customerId: string;
  addressLine: string;
  cityId: number;
  city: string;
  stateId: number;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface AddressAddModel {
  customerId: string;
  title: string;
  addressLine: string;
  city: string;
  cityId: number;
  stateId: number;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface AddressUpdateModel {
  id: string;
  customerId: string;
  title: string;
  addressLine: string;
  city: string;
  cityId: number;
  stateId: number;
  state: string;
  postalCode: string;
  latitude: number;
  longitude: number;
  createdDate: string;
}
