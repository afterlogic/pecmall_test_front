import helpers from '@src/shared/utils/helpers';

import http, { axiosWithoutAuth, updateToken } from './http';
import type { ResponseType } from './http';

type LoginTokenType = { access_token: string };

const login = async (data: { email: string; password: string }) => {
  const response = await axiosWithoutAuth.post<ResponseType<LoginTokenType>>(
    '/user/login',
    data,
  );
  helpers.setToken(response.data.access_token);
  updateToken();
  return response;
};

const getMe = () => {
  return http.get<ResponseType<{ login: string }>>('/user/get-me');
};

const getToken = () => {
  return http.get<ResponseType<LoginTokenType>>('/user/refresh');
};

export default {
  login,
  getMe,
  getToken,
};
