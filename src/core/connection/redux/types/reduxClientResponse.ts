export interface ReduxClientSuccess<T> {
  data: T;
}

export interface ReduxClientError {
  error: {
    status?: number;
    data?: any;
  };
}

export type ReduxClientResponse<T = any> = ReduxClientSuccess<T> | ReduxClientError;
