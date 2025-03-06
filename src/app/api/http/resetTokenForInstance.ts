import type { AxiosInstance } from 'axios';

import getAuthString from './getAuthString';

const resetTokenForInstance = (axiosInstance: AxiosInstance) => {
  axiosInstance.defaults.headers.authorization = getAuthString();
};

export default resetTokenForInstance;
