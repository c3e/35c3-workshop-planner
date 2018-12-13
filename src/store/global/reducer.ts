import { Reducer } from 'redux';
import { GlobalState, defaultGlobalState, GlobalActionTypes } from './types';
import LOGGER from '../../utils/Logger';

// Type-safe initialState
const initialState: GlobalState = defaultGlobalState;

const reducer: Reducer<GlobalState> = (state = initialState, action: any) => {
  LOGGER.info(`Reducer called with action ${action.type}`);
  switch (action.type) {
    case GlobalActionTypes.WORKSHOPS_LOADED: {
      return { ...state, workshops: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as globalReducer };
