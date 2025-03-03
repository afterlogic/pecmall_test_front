import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { IUser } from '@src/app/types';

const getInitialStore = () => ({
  user: null as IUser | null,
});

const mainSlice = createSlice({
  name: 'main',
  initialState: getInitialStore,
  reducers: {
    setUser: (store, { payload }: PayloadAction<IUser | null>) => {
      store.user = payload;
    },
  },
});

export const mainSliceActions = mainSlice.actions;

export default mainSlice.reducer;
