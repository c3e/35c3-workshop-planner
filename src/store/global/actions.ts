import { action } from 'typesafe-actions';
import { GlobalActionTypes } from './types';
import WorkshopSession from '../../dataobjects/WorkshopSession';
import WorkshopEvent from '../../dataobjects/WorkshopEvent';
import WorkshopFavorite from '../../dataobjects/WorkshopFavorite';
import { AvailableLanguages } from '../../i18n/AvailableLanguages';
// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const workshopsLoaded = (workshops: WorkshopSession[]) => action<string, WorkshopSession[]>(GlobalActionTypes.WORKSHOPS_LOADED, workshops);

export const currentWorkshopSelected = (workshop: WorkshopSession, event: WorkshopEvent) =>
    action<string, {workshop: WorkshopSession, event: WorkshopEvent}>(
        GlobalActionTypes.CURRENT_WORKSHOP_SELECTED, { workshop, event }
        );

export const selectedDateChanged = (date: string) => action<string, string>(GlobalActionTypes.SELECTED_DATE_CHANGED, date);

export const selectedTimeFilterChanged = (filter: string) => action<string, string>(GlobalActionTypes.SELECTED_TIME_FILTER_CHANGED, filter);

export const apiUpdateFrequencyChanged = (frequency: number) => action<string, number>(GlobalActionTypes.API_UPDATE_FREQUENCY_CHANGED, frequency);

export const lastApiUpdateChanged = (time: number) => action<string, number>(GlobalActionTypes.LAST_API_UPDATE_CHANGED, time);

export const newWorkshopFavoriteAdded = (favorite: WorkshopFavorite) => action<string, WorkshopFavorite>(GlobalActionTypes.NEW_WORKSHOP_FAVORITE_ADDED, favorite);

export const workshopFavoriteRemoved = (favorite: WorkshopFavorite) => action<string, WorkshopFavorite>(GlobalActionTypes.WORKSHOP_FAVORITE_REMOVED, favorite);

export const workshopFavoritesLoaded = (favorites: WorkshopFavorite[]) => action<string, WorkshopFavorite[]>(GlobalActionTypes.WORKSHOP_FAVORITES_LOADED, favorites);

export const languageChanged = (lang: AvailableLanguages) => action<string, AvailableLanguages>(
    GlobalActionTypes.LANGUAGE_CHANGED, lang
);
