import helpers from '@src/shared/utils/helpers';

import http, { axiosWithoutAuth, updateToken } from './http';
import type { ResponseType } from './http';

type LoginTokenType = { access_token: string };

const login = async (data: { login: string; password: string }) => {
  const response = await axiosWithoutAuth.post<ResponseType<LoginTokenType>>(
    'auth/login',
    data,
  );
  helpers.setToken(response.data.access_token);
  updateToken();
  return response;
};

const getMe = () => {
  return http.get<ResponseType<{ login: string }>>('/auth/get-me');
};

const getToken = () => {
  return http.get<ResponseType<LoginTokenType>>('/auth/refresh');
};

export default {
  login,
  getMe,
  getToken,
};
