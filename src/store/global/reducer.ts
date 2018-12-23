import { Reducer } from 'redux';
import { defaultGlobalState, GlobalActionTypes, GlobalState } from './types';
import LOGGER from '../../utils/Logger';
import { StorageKeys, storeData } from '../../persist/Storage';
import { parseRoomsFrom } from '../../helper/RoomParser';
import WorkshopFavorite from '../../dataobjects/WorkshopFavorite';
import AppSettings from '../../helper/AppSettings';

// Type-safe initialState
const initialState: GlobalState = defaultGlobalState;

const reducer: Reducer<GlobalState> = (state = initialState, action: any) => {
  LOGGER.info(`Reducer called with action ${action.type}`);
  switch (action.type) {
    case GlobalActionTypes.WORKSHOPS_LOADED: {
      storeData(StorageKeys.SESSIONS, action.payload)
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
    case GlobalActionTypes.WORKSHOP_FAVORITES_LOADED: {
      return { ...state, favorites: action.payload };
    }
    case GlobalActionTypes.LANGUAGE_CHANGED: {
      AppSettings.LANGUAGE = action.payload;
      storeData(StorageKeys.LANGUAGE, action.payload)
          .then((val) => {
            LOGGER.debug(`WorkshopFavorites stored call result in : ${val}`);
          })
          .catch((e) => {
            LOGGER.error(`Cannot store workshop list. Error: ${e}`);
          });
      return { ...state, currentLanguage: action.payload };
    }
    case GlobalActionTypes.NEW_WORKSHOP_FAVORITE_ADDED: {
      const newFav: WorkshopFavorite = action.payload;
      const contains = state.favorites.find((fav) => fav.equals(newFav)) !== undefined;
      if (contains === false) {
        const newList: WorkshopFavorite[] = [];
        newList.push(...state.favorites);
        newList.push(newFav);
        storeData(StorageKeys.FAVORITES, newList)
            .then((val) => {
              LOGGER.debug(`WorkshopFavorites stored call result in : ${val}`);
            })
            .catch((e) => {
              LOGGER.error(`Cannot store workshop list. Error: ${e}`);
            });
        return { ...state, favorites: newList };
      }
      return { ...state };
    }
    case GlobalActionTypes.WORKSHOP_FAVORITE_REMOVED: {
      const toRemove: WorkshopFavorite = action.payload;
      const newList: WorkshopFavorite[] = [];

      state.favorites.forEach((fav) => {
        if (!fav.equals(toRemove)) newList.push(fav);
      });

      storeData(StorageKeys.FAVORITES, newList)
          .then((val) => {
            LOGGER.debug(`WorkshopFavorites stored call result in : ${val}`);
          })
          .catch((e) => {
            LOGGER.error(`Cannot store workshop list. Error: ${e}`);
          });
      return { ...state, favorites: newList };
    }
    default: {
      return state;
    }
  }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export { reducer as globalReducer };
