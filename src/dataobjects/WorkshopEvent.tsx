import { getNumberProp, getStringProp } from '../helper/TypeOf';
import { parseZone, Moment } from 'moment';

export default class WorkshopEvent {

  private static _DATE_FORMAT = 'YYYY/MM/DD HH:mm';

  private _guid: string;
  private _startTime: string;
  private _startTimeObject: Moment;
  private _duration: number;
  private _location: string;
  private _subtitle: string = '';
  private _workshopId: number;

  constructor(guid: string, startTime: string, duration: number, location: string, workhopsId: number = 0) {
    this._guid = guid;
    this._startTime = startTime;
    this._duration = duration;
    this._location = location;
    this._workshopId = workhopsId;

    this._startTimeObject = parseZone(startTime, WorkshopEvent._DATE_FORMAT);
  }

  get guid(): string {
    return this._guid;
  }

  set guid(value: string) {
    this._guid = value;
  }

  get startTime(): string {
    return this._startTime;
  }

  set startTime(value: string) {
    this._startTime = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get subtitle(): string {
    return this._subtitle;
  }

  set subtitle(value: string) {
    this._subtitle = value;
  }

  get workshopId(): number {
    return this._workshopId;
  }

  set workshopId(value: number) {
    this._workshopId = value;
  }

  get startTimeObject(): Moment {
    return this._startTimeObject;
  }

  set startTimeObject(value: Moment) {
    this._startTimeObject = value;
  }

  static buildFromStoreObject(raw: any): WorkshopEvent {

    const guid = getStringProp(raw, '_guid');
    const startTime = getStringProp(raw, '_startTime');
    const duration = getNumberProp(raw, '_duration');
    const location = getStringProp(raw, '_location');
    const subtitle = getStringProp(raw, '_subtitle');
    const workshopId = getNumberProp(raw, '_workshopId');

    const result = new WorkshopEvent(guid, startTime, duration, location, workshopId);
    result.subtitle = subtitle;

    return result;
  }
}
