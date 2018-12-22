import { getNumberProp, getStringProp } from '../helper/TypeOf';
import { parseZone, Moment } from 'moment';

export default class WorkshopEvent {

  private static _DATE_FORMAT = 'YYYY/MM/DD HH:mm';

  private _guid: string;
  private _startTime: string;
  private _startTimeObject: Moment;
  private _endTimeObject: Moment;
  private _duration: number;
  private _location: string;
  private _subtitle: string = '';
  private _workshopId: number;

  constructor(guid: string, startTime: string, duration: number, location: string, workshopId: number = 0) {
    this._guid = guid;
    this._startTime = startTime;
    this._duration = duration;
    if (location === undefined || location === null || location.trim() === '') {
      this._location = 'unknown';
    } else {
      this._location = location;
    }
    this._workshopId = workshopId;

    this._startTimeObject = parseZone(startTime, WorkshopEvent._DATE_FORMAT);
    this._endTimeObject = parseZone(startTime, WorkshopEvent._DATE_FORMAT).add(duration, 'minutes');
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

  get endTimeObject(): Moment {
    return this._endTimeObject;
  }

  set endTimeObject(value: Moment) {
    this._endTimeObject = value;
  }

  static buildFromStoreObject(raw: any, parentId = 0): WorkshopEvent {

    const guid = getStringProp(raw, '_guid');
    const startTime = getStringProp(raw, '_startTime');
    const duration = getNumberProp(raw, '_duration');
    let location = getStringProp(raw, '_location', 'unknown');
    if (location.trim() === '') {
      location = 'unknown';
    }
    const subtitle = getStringProp(raw, '_subtitle');
    const workshopId = parentId > 0 ? parentId : getNumberProp(raw, '_workshopId');

    const result = new WorkshopEvent(guid, startTime, duration, location, workshopId);
    result.subtitle = subtitle;

    return result;
  }

  public equals(workshopEvent: WorkshopEvent): boolean {
    return this.startTimeObject.isSame(workshopEvent.startTimeObject) &&
        this.location.trim() === workshopEvent.location.trim() &&
        this.duration === workshopEvent.duration;
  }
}
