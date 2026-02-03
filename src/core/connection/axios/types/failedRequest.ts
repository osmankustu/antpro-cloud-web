export type FailedRequest = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};
