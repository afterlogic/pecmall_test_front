export enum EnvTypeENUM {
  development = 'development',
  production = 'production',
}

export const envType =
  process.env.REACT_APP_ENV || process.env.NODE_ENV || EnvTypeENUM.development;

export const isDev = envType === EnvTypeENUM.development;
export const isProd = envType === EnvTypeENUM.production;

const config = {
  apiUrl: 'https://api.pecmall.afterlogic.works',
  maxNumberOfAttempts: 10,
  protocol: 'http://',
  domain: 'localhost:3000',
};

switch (envType) {
  case EnvTypeENUM.development:
    config.apiUrl = 'https://api.pecmall.afterlogic.works';
    config.protocol = 'http://';
    config.domain = 'http://dev..com/';
    break;
  case EnvTypeENUM.production:
    config.apiUrl = 'https://api.pecmall.afterlogic.works';
    config.protocol = 'http://';
    config.domain = 'http://dev..com/';
    break;
}

export default config;
