import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import rootReducer, { RESET_STORE_ACTION_TYPE } from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    });

    return middlewares;
  },
  preloadedState: rootReducer(undefined, {
    type: RESET_STORE_ACTION_TYPE,
    payload: undefined,
  }),
});

export type AppDispatchType = typeof store.dispatch;
export type AppStateType = ReturnType<typeof store.getState>;

export const useAppDispatch: typeof useDispatch<AppDispatchType> = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export const resetStore = () =>
  store.dispatch({ type: RESET_STORE_ACTION_TYPE });

export default store;
