const defaultGetFunction = (key: string) => {
  return localStorage.getItem(key);
};

const defaultSetFunction = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const defaultRemoveFunction = (key: string) => {
  localStorage.removeItem(key);
};

type SetFunctionType<P> = P extends undefined
  ? (key: string, value: string) => void
  : (key: string, value: string, options?: P) => void;

class CoreStorageItem<D, P = undefined> {
  private key: string;

  private defaultValue: D | null;

  private shouldUseEncoding: boolean;

  getFunction: typeof defaultGetFunction;

  setFunction: SetFunctionType<P>;

  removeFunction: typeof defaultRemoveFunction;

  private encoder: (value: string) => string;

  private decoder: (value: string) => string;

  constructor(params: {
    key: string;
    keyPrefix: string;
    shouldAddPrefixToKey: boolean;
    shouldUseEncoding: boolean;
    defaultValue: D | null;
    getFunction?: typeof defaultGetFunction;
    setFunction?: SetFunctionType<P>;
    removeFunction?: typeof defaultRemoveFunction;
    encoder?: (value: string) => string;
    decoder?: (value: string) => string;
  }) {
    const keyPrefix = params.shouldAddPrefixToKey ? params.keyPrefix : '';
    this.key = `${keyPrefix}${params.key}`;
    this.shouldUseEncoding = params.shouldUseEncoding;
    this.defaultValue = params.defaultValue;

    this.getFunction = params.getFunction || defaultGetFunction;
    this.setFunction =
      params.setFunction || (defaultSetFunction as SetFunctionType<P>);
    this.removeFunction = params.removeFunction || defaultRemoveFunction;

    this.encoder = params.encoder || ((str: string) => window.btoa(str));
    this.decoder = params.decoder || ((str: string) => window.atob(str));

    if (this.shouldUseEncoding) {
      this.key = this.encoder(this.key);
    }
  }

  get = (): D | null => {
    const value = this.getFunction(this.key);

    if (value === null) {
      return this.defaultValue || null;
    }

    let decodedValue: string;
    if (this.shouldUseEncoding) {
      const decodedString = this.decoder(value);
      decodedValue = decodeURIComponent(decodedString);
    } else {
      decodedValue = value;
    }
    const parsedValue = JSON.parse(decodedValue);

    return parsedValue;
  };

  set = ((value, options) => {
    const stringifyedValue = JSON.stringify(value);

    let encodedValue: string;
    if (this.shouldUseEncoding) {
      const encodedString = encodeURIComponent(stringifyedValue);
      encodedValue = this.encoder(encodedString);
    } else {
      encodedValue = stringifyedValue;
    }
    this.setFunction(this.key, encodedValue, options);
  }) as P extends undefined
    ? (value: D) => void
    : (value: D, options?: P) => void;

  remove = () => {
    this.removeFunction(this.key);
  };
}

export default CoreStorageItem;
