export enum EnvTypeENUM {
  development = 'development',
  production = 'production',
}

const envType =
  import.meta.env.MODE === 'production'
    ? EnvTypeENUM.production
    : EnvTypeENUM.development;

export const isDev = envType === EnvTypeENUM.development;
export const isProd = envType === EnvTypeENUM.production;

const config = {
  apiUrl: 'https://pecmall.afterlogic.works/api',
  maxNumberOfAttempts: 10,
  protocol: 'http://',
  domain: 'localhost:3000',
};

switch (envType) {
  case EnvTypeENUM.development:
    config.apiUrl = 'https://pecmall.afterlogic.works/api';
    config.protocol = 'http://';
    config.domain = 'http://dev..com/';
    break;
  case EnvTypeENUM.production:
    config.apiUrl = 'https://pecmall.afterlogic.works/api/';
    config.protocol = 'http://';
    config.domain = 'http://dev..com/';
    break;
}

export default config;
