import { BaseModel } from '@/core/model/baseModel';

export interface ServiceHistoryModel extends BaseModel {
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
  poolId: string;
  employeeId?: string;
  teamId?: string;
}
