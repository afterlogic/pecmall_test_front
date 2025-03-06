import store, { resetStore } from '@src/store';
import authApi from '@src/app/api/authApi';

import storage from './storage';

const sleep = (timeout: number) =>
  new Promise((res) => {
    setTimeout(res, timeout);
  });

const setToken = (authToken: string) => {
  storage.authToken.set(authToken);
};

const logOut = () => {
  store.dispatch(resetStore());
  storage.authToken.remove();
  window.location.replace('/');
};

const resetAuthToken = async () => {
  try {
    const { data } = await authApi.getToken();
    if (!data?.access_token) {
      logOut();
      return false;
    }
    setToken(data.access_token);

    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    logOut();
    return false;
  }
};

export default {
  sleep,
  setToken,
  logOut,
  resetAuthToken,
};
