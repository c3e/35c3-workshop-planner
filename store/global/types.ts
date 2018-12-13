import WorkshopSession from '../../src/dataobjects/WorkshopSession';

export interface GlobalState {
  workshops: WorkshopSession[];
}

export const defaultGlobalState: GlobalState = {
  workshops: []
} ;

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum GlobalActionTypes {
  WORKSHOPS_LOADED = '@@global/WORKSHOPS_LOADED'
}
