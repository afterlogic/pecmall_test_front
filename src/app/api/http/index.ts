import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import _random from 'lodash/random';

import config, { isDev } from '@src/config';
import helpers from '@src/shared/utils/helpers';
import { checkError } from '@src/shared/utils/checkError';

import getAuthString from './getAuthString';
import resetTokenForInstance from './resetTokenForInstance';

export type ResponseType<P = null> = P;

export const axiosWithoutAuth = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

const http = axios.create({
  baseURL: config.apiUrl,
  headers: {
    authorization: getAuthString(),
  },
  withCredentials: true,
});

export const updateToken = () => resetTokenForInstance(http);

http.interceptors.request.use(async (request) => {
  if (isDev) {
    await helpers.sleep(_random(100, 1000));
  }

  return request;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    try {
      const request = error.config as AxiosRequestConfig & {
        numberOfAttempts: number;
      };
      if (!request) throw error;

      const isBadGatewayError = checkError.isBadGatewayError(error);

      if (isBadGatewayError && (request.numberOfAttempts || 0) < 10) {
        await helpers.sleep(200);
        request.numberOfAttempts = (request.numberOfAttempts || 1) + 1;
        return http(request);
      }

      if (error.response?.status === 401) {
        if (!refreshPromise) {
          refreshPromise = helpers.resetAuthToken();
        }
        const isRefreshed = await refreshPromise;
        refreshPromise = null;
        if (!isRefreshed) {
          throw error;
        }
        request.headers.authorization = getAuthString();
        return http(request);
      }
    } catch (err) {
      console.error(err);
      helpers.logOut();
    }
    throw error;
  },
);

let refreshPromise: Promise<boolean> | null = null;

export default http;
