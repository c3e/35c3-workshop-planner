import { getNumberProp, getStringProp } from '../helper/TypeOf';

export default class WorkshopSession {

  private _pageid: number;
  private _ns: number;
  private _title: string;
  private _sortkey: string;
  private _type: string;
  private _timestamp: string;

  static buildFromStoreObject(raw: object): WorkshopSession {

    const pageid = getNumberProp(raw, '_pageid');
    const ns = getNumberProp(raw, '_ns');
    const title = getStringProp(raw, '_title');
    const sortkey = getStringProp(raw, '_sortkey');
    const type = getStringProp(raw, '_type');
    const timestamp = getStringProp(raw, '_timestamp');

    return new WorkshopSession(pageid, ns, title, sortkey, type, timestamp);
  }

  constructor(pageid: number, ns: number, title: string, sortkey: string, type: string, timestamp: string) {
    this._pageid = pageid;
    this._ns = ns;
    this._title = title;
    this._sortkey = sortkey;
    this._type = type;
    this._timestamp = timestamp;
  }

  get pageid(): number {
    return this._pageid;
  }

  set pageid(value: number) {
    this._pageid = value;
  }

  get ns(): number {
    return this._ns;
  }

  set ns(value: number) {
    this._ns = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get sortkey(): string {
    return this._sortkey;
  }

  set sortkey(value: string) {
    this._sortkey = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get timestamp(): string {
    return this._timestamp;
  }

  set timestamp(value: string) {
    this._timestamp = value;
  }
}
