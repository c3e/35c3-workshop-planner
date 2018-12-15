import { getNumberProp, getObjectProp, getStringProp } from '../helper/TypeOf';

export default class WorkshopEvent {

  private _guid: string;
  private _startTime: string;
  private _duration: number;
  private _location: string;
  private _subtitle: string = '';

  constructor(guid: string, startTime: string, duration: number, location: string) {
    this._guid = guid;
    this._startTime = startTime;
    this._duration = duration;
    this._location = location;
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

  static buildFromStoreObject(raw: any): WorkshopEvent {

    const guid = getStringProp(raw, '_guid');
    const startTime = getStringProp(raw, '_startTime');
    const duration = getNumberProp(raw, '_duration');
    const location = getStringProp(raw, '_location');
    const subtitle = getStringProp(raw, '_subtitle');

    const result = new WorkshopEvent(guid, startTime, duration, location);
    result.subtitle = subtitle;

    return result;
  }
}
