export interface ResponseError {
  statusCode?: number;
  title: string;
  detail?: string;
  type?: string;
  traceId?: string;
  Errors?: Error[]; // validation hataları için
}

export interface Error {
  Property: string;
  Errors: string[];
}
