import type { AxiosError } from 'axios';

const isBadGatewayError = (error: AxiosError) =>
  error?.status === 502 ||
  error?.response?.status === 502 ||
  error?.status === 500 ||
  error?.response?.status === 500 ||
  error?.message === 'Network Error';

export const checkError = {
  isBadGatewayError,
};
