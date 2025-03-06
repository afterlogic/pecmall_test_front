import Cookie from 'js-cookie';

import CoreStorageItem from './CoreStorageItem';

class CookieItem<D> extends CoreStorageItem<D, Cookie.CookieAttributes> {
  defaultOptions?: Cookie.CookieAttributes;

  constructor(params: {
    key: string;
    shouldAddPrefixToKey?: boolean;
    defaultValue?: D | null;
    defaultOptions?: Cookie.CookieAttributes;
  }) {
    super({
      key: params.key,
      keyPrefix: 'pec-mall',
      shouldAddPrefixToKey: params.shouldAddPrefixToKey ?? true,
      shouldUseEncoding: false,
      defaultValue: params.defaultValue || null,
      getFunction: (key: string) => Cookie.get(key) || null,
      setFunction: (
        key: string,
        value: string,
        options?: Cookie.CookieAttributes,
      ) => {
        Cookie.set(key, value, options || this.defaultOptions);
      },
      removeFunction: (key: string, options?: Cookie.CookieAttributes) => {
        Cookie.remove(key, options || this.defaultOptions);
      },
    });
    this.defaultOptions = params.defaultOptions;
  }
}

export default CookieItem;
