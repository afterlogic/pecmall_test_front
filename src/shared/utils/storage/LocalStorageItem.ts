// import { isDev } from 'src/config';
import CoreStorageItem from './CoreStorageItem';

class LocalStorageItem<D> extends CoreStorageItem<D> {
  constructor(params: {
    key: string;
    shouldAddPrefixToKey?: boolean;
    defaultValue?: D | null;
  }) {
    super({
      key: params.key,
      keyPrefix: 'pec-mall',
      shouldAddPrefixToKey: params.shouldAddPrefixToKey ?? true,
      // shouldUseEncoding: !isDev,
      shouldUseEncoding: true,
      defaultValue: params.defaultValue || null,
    });
  }
}

export default LocalStorageItem;
