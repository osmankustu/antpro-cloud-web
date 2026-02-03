import { BaseModel } from '@/core/model/baseModel';

export interface DocumentModel extends BaseModel {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
}

export interface SignedDocument {
  signedUrls: Record<string, string>;
}

export interface SignedDocumentRequest {
  urls: string[];
  duration: number;
}

export interface DocumentAddModel {
  activityId: string;
  serviceId: string;
  files: any[];
}

export interface DocumentUpdateModel {}
