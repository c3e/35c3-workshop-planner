import WorkshopSession from '../../dataobjects/WorkshopSession';
import WorkshopEvent from '../../dataobjects/WorkshopEvent';
import t from '../../i18n/Translator';

export interface GlobalState {
  workshops: WorkshopSession[];
  currentWorkshop: WorkshopSession | null;
  currentEvent: WorkshopEvent | null;
  rooms: string[];
  selectedDate: '2018/12/27' | '2018/12/28' | '2018/12/29' | '2018/12/30';
}

export const VALID_DATES = [
    { label: t('Day 1'), value: '2018/12/27' },
    { label: t('Day 2'), value: '2018/12/28' },
    { label: t('Day 3'), value: '2018/12/29' },
    { label: t('Day 4'), value: '2018/12/30' }];

export const defaultGlobalState: GlobalState = {
  workshops: [],
  currentWorkshop: null,
  currentEvent:  null,
  rooms: [],
  selectedDate: '2018/12/27'
} ;

// Use `const enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export enum GlobalActionTypes {
  WORKSHOPS_LOADED = '@@global/WORKSHOPS_LOADED',
  CURRENT_WORKSHOP_SELECTED = '@@global/CURRENT_WORKSHOP_SELECTED',
  SELECTED_DATE_CHANGED = '@@global/SELECTED_DATE_CHANGED'
}
