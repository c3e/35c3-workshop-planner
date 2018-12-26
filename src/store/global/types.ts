import WorkshopSession from '../../dataobjects/WorkshopSession';
import WorkshopEvent from '../../dataobjects/WorkshopEvent';
import t from '../../i18n/Translator';
import WorkshopFavorite from '../../dataobjects/WorkshopFavorite';
import { AvailableLanguages } from '../../i18n/AvailableLanguages';
import AppSettings from '../../helper/AppSettings';
import { WorkshopFilterOptions } from '../../constants/WorkshopFilterOptions';

export interface GlobalState {
  workshops: WorkshopSession[];
  currentWorkshop: WorkshopSession | null;
  currentEvent: WorkshopEvent | null;
  favorites: WorkshopFavorite[];
  rooms: string[];
  selectedDate: '2018/12/27' | '2018/12/28' | '2018/12/29' | '2018/12/30';
  selectedTimeFilter: WorkshopFilterOptions.DAY | WorkshopFilterOptions.SIX_HOURS | WorkshopFilterOptions.NOW;
  lastApiUpdate: number;
  updateApiFrequency: number;
  currentLanguage: AvailableLanguages;
}

export const VALID_DATES = [
    { label: t('Day 1'), value: '2018/12/27' },
    { label: t('Day 2'), value: '2018/12/28' },
    { label: t('Day 3'), value: '2018/12/29' },
    { label: t('Day 4'), value: '2018/12/30' }];

export const DAY_FILTER_OPTIONS = [
    { label: t('Hole Day'), value: WorkshopFilterOptions.DAY },
    { label: t('Next 6h'), value: WorkshopFilterOptions.SIX_HOURS },
    { label: t('Now'), value: WorkshopFilterOptions.NOW }
];

export const defaultGlobalState: GlobalState = {
  workshops: [],
  currentWorkshop: null,
  currentEvent:  null,
  favorites: [],
  rooms: [],
  selectedDate: '2018/12/27',
  lastApiUpdate: 0,
  updateApiFrequency: 15 * 60 * 1000,
  currentLanguage: AppSettings.LANGUAGE,
  selectedTimeFilter: WorkshopFilterOptions.DAY
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
  SELECTED_DATE_CHANGED = '@@global/SELECTED_DATE_CHANGED',
  LAST_API_UPDATE_CHANGED = '@@global/LAST_API_UPDATE_CHANGED',
  API_UPDATE_FREQUENCY_CHANGED = '@@global/API_UPDATE_FREQUENCY_CHANGED',
  NEW_WORKSHOP_FAVORITE_ADDED = '@@global/NEW_WORKSHOP_FAVORITE_ADDED',
  WORKSHOP_FAVORITE_REMOVED = '@@global/WORKSHOP_FAVORITE_REMOVED',
  WORKSHOP_FAVORITES_LOADED = '@@global/WORKSHOP_FAVORITES_LOADED',
  LANGUAGE_CHANGED = '@@global/LANGUAGE_CHANGED',
  SELECTED_TIME_FILTER_CHANGED = '@@global/SELECTED_TIME_FILTER_CHANGED'
}
