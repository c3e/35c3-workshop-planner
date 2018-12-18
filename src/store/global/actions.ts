import { action } from 'typesafe-actions';
import { GlobalActionTypes } from './types';
import WorkshopSession from '../../dataobjects/WorkshopSession';
import WorkshopEvent from '../../dataobjects/WorkshopEvent';
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
