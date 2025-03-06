import type { AxiosError } from 'axios';

const isBadGatewayError = (error: AxiosError) =>
  error?.status === 502 ||
  error?.response?.status === 502 ||
  error?.status === 500 ||
  error?.response?.status === 500 ||
  error?.message === 'Network Error';

const isUserExist = (error: AxiosError) => error?.response?.status === 409;

export const checkError = {
  isBadGatewayError,
  isUserExist,
};
