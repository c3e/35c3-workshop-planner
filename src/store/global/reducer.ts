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
      storeData(StorageKeys.WORKSHOP_PLANNER_SESSION_LIST, action.payload)
          .then((val) => {
            LOGGER.debug(`WorkshopSessions stored call result in : ${val}`);
          })
          .catch((e) => {
            LOGGER.error(`Cannot store workshop list. Error: ${e}`);
          });
      return { ...state, workshops: action.payload, rooms: parseRoomsFrom(action.payload) };
    }
    case GlobalActionTypes.CURRENT_WORKSHOP_SELECTED: {
      return { ...state, currentWorkshop: action.payload.workshop, currentEvent: action.payload.event };
    }
    case GlobalActionTypes.SELECTED_DATE_CHANGED: {
      return { ...state, selectedDate: action.payload };
    }
    case GlobalActionTypes.LAST_API_UPDATE_CHANGED: {
      return { ...state, lastApiUpdate: action.payload };
    }
    case GlobalActionTypes.API_UPDATE_FREQUENCY_CHANGED: {
      return { ...state, updateApiFrequency: action.payload };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as globalReducer };
