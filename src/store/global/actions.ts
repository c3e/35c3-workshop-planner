import { action } from 'typesafe-actions';
import { GlobalActionTypes } from './types';
import WorkshopSession from '../../dataobjects/WorkshopSession';
// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const workshopsLoaded = (workshops: WorkshopSession[]) => action<String, WorkshopSession[]>(GlobalActionTypes.WORKSHOPS_LOADED, workshops);
