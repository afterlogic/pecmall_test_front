import helpers from '@src/shared/utils/helpers';

import http, { axiosWithoutAuth, updateToken } from './http';
import type { ResponseType } from './http';

type LoginTokenType = { token: string };

const login = async (data: { email: string; password: string }) => {
  const response = await axiosWithoutAuth.post<ResponseType<LoginTokenType>>(
    '/user/login',
    data,
  );
  helpers.setToken(response.data.token);
  updateToken();
  return response;
};

export const resetPassword = async (data: { email: string }) => {
  const response = await axiosWithoutAuth.post<ResponseType>(
    '/user/resetPassword',
    data,
  );
  return response;
};

const signUp = async (data: {
  userType: boolean;
  email: string;
  firstName: string;
  lastName: string;
  patronimicName: string;
  phone: string;
  region: string;
  companyData?: {
    companyName: string;
    inn: string;
    kpp: string;
    bank: string;
    bankCity: string;
    bik: string;
    account: string;
    corrAccount: string;
    ogrn: string;
    okpo: string;
  };

  legalAddress?: {
    postalCode: string;
    country: string;
    region: string;
    city: string;
    street: string;
    houseNumber: string;
    building: string;
    apartment: string;
  };
}) => {
  const response = await axiosWithoutAuth.post<ResponseType<LoginTokenType>>(
    '/user/signup',
    data,
  );
  helpers.setToken(response.data.token);
  updateToken();
  return response;
};

const getMe = () => {
  return http.get<ResponseType<{ login: string }>>('/user/getMe');
};

const getToken = () => {
  return http.get<ResponseType<LoginTokenType>>('/user/refresh');
};

export default {
  login,
  signUp,
  getMe,
  getToken,
  resetPassword,
};
