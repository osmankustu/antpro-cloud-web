export interface ReduxClientRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;

  // 👇 yeni
  onUploadProgress?: (progress: number) => void;
}
