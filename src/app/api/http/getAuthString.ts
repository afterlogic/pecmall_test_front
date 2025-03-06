import storage from '@src/shared/utils/storage';

const getAuthString = () => `Bearer ${storage.authToken.get()}`;

export default getAuthString;
