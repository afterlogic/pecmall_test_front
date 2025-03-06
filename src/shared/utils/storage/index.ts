import CookieItem from './CookieItem';

export default {
  authToken: new CookieItem<string>({ key: 'authToken' }),
};
