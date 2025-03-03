import { combineReducers } from 'redux';

import mainSlice from '@src/store/mainSlice';

const combinedReducer = combineReducers({
  main: mainSlice,
});

export const RESET_STORE_ACTION_TYPE = 'RESET_WHOLE_STORE';

const rootReducer = (
  state: ReturnType<typeof combinedReducer> | undefined,
  action: { type: string; payload: unknown },
) => {
  if (action.type === RESET_STORE_ACTION_TYPE) {
    return combinedReducer(undefined, action);
  }

  return combinedReducer(state, action);
};

export default rootReducer;
