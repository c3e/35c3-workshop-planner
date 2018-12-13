import { combineReducers } from 'redux';
import { defaultGlobalState, GlobalState } from './global/types';
import { globalReducer } from './global/reducer';

export interface ApplicationState {
  global: GlobalState;
}

export const defaultApplicationState: ApplicationState = {
  global: defaultGlobalState
};

export const rootReducer = combineReducers<ApplicationState>({
  global: globalReducer
});
