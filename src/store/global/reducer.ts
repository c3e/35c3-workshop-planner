import { Reducer } from 'redux';
import { defaultGlobalState, GlobalActionTypes, GlobalState } from './types';
import LOGGER from '../../utils/Logger';
import { StorageKeys, storeData } from '../../persist/Storage';
import { parseRoomsFrom } from '../../helper/RoomParser';

// Type-safe initialState
const initialState: GlobalState = defaultGlobalState;

const reducer: Reducer<GlobalState> = (state = initialState, action: any) => {
  LOGGER.info(`Reducer called with action ${action.type}`);
  switch (action.type) {
    case GlobalActionTypes.WORKSHOPS_LOADED: {
      try {
        storeData(StorageKeys.WORKSHOP_PLANNER_SESSION_LIST, action.payload);
      } catch (e) {
        //
      }
      return { ...state, workshops: action.payload, rooms: parseRoomsFrom(action.payload) };
    }
    case GlobalActionTypes.CURRENT_WORKSHOP_SELECTED: {
      return { ...state, currentWorkshop: action.payload.workshop, currentEvent: action.payload.event};
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as globalReducer };
