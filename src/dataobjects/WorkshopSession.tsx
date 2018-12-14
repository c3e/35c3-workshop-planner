import { parse } from 'fast-xml-parser';
import { getNumberProp, getObjectProp, getStringProp } from '../helper/TypeOf';
import WorkshopEvent from './WorkshopEvent';
import LOGGER from '../utils/Logger';

interface IWorkshopRawData {
  revid: number;
  parentid: number;
  user: string;
  userid: number;
  timestamp: string;
  size: number;
  tags: any[];
  parsetree: any;
}

interface IWorkshop {
  pageid: number;
  ns: number;
  title: string;
  revisions: IWorkshopRawData[];
}

export default class WorkshopSession {

  private _pageid: number;
  private _ns: number;
  private _title: string;
  private _sortkey: string;
  private _type: string;
  private _timestamp: string;
  private _data: any;
  private _user?: string;
  private _userId?: number;
  private _revisionId?: number;
  private _rawSessionData?: string;

  private _description: string = '';
  private _orgaContact: string = '';
  private _organizedBy: string = '';
  private _tags: string[] = [];
  private _keywords: string[] = [];
  private _website: string = '';
  private _language: string = '';
  private _forKids: string = 'Unknown';
  private _processedByAssembly: string = '';
  private _sessionType: string = '';
  private _isRelatedTo: string = '';

  private _workshopEvents: WorkshopEvent[] = [];
  private _rawDescription: string = '';

  static buildFromStoreObject(raw: object): WorkshopSession {

    const pageid = getNumberProp(raw, '_pageid');
    const ns = getNumberProp(raw, '_ns');
    const title = getStringProp(raw, '_title');
    const sortkey = getStringProp(raw, '_sortkey');
    const type = getStringProp(raw, '_type');
    const timestamp = getStringProp(raw, '_timestamp');
    const data = getObjectProp(raw,'_data');

    const result = new WorkshopSession(pageid, ns, title, sortkey, type, timestamp, data);

    result.user = getStringProp(raw, '_user');
    result.userId = getNumberProp(raw, '_userId');
    result.revisionId = getNumberProp(raw, '_revisionId');
    result.rawSessionData = getStringProp(raw, '_rawSessionData');

    // todo fix load of 2. data blog

    return result;
  }

  static buildFromApiObject(raw: object): WorkshopSession {

    const pageid = getNumberProp(raw, 'pageid');
    const ns = getNumberProp(raw, 'ns');
    const title = getStringProp(raw, 'title');
    const sortkey = getStringProp(raw, 'sortkey');
    const type = getStringProp(raw, 'type');
    const timestamp = getStringProp(raw, 'timestamp');
    const data = getObjectProp(raw, 'data');

    return new WorkshopSession(pageid, ns, title, sortkey, type, timestamp, data);
  }

  constructor(pageid: number, ns: number, title: string, sortkey: string, type: string, timestamp: string, data: object) {
    this._pageid = pageid;
    this._ns = ns;
    this._title = title;
    this._sortkey = sortkey;
    this._type = type;
    this._timestamp = timestamp;
    this._data = data;
  }

  addSessionData(raw: IWorkshop): void {
    const revision = raw.revisions[0];
    this.userId = revision.userid;
    this.user = revision.user;
    this.timestamp = revision.timestamp;
    this.revisionId = revision.revid;
    this.rawSessionData = revision.parsetree;

    const parsedXML: any = parse(this.rawSessionData);

    if (parsedXML.root.hasOwnProperty('template') && Array.isArray(parsedXML.root.template)) {
      const templates: any[] = parsedXML.root.template;

      templates.forEach((value: any) => {
        switch (value.title) {
          case 'Session': {
            if (Array.isArray(value.part)) {
              this.convertSessionData(this.parsePart(value.part));
            }
            break;
          }
          case 'Event': {
            if (Array.isArray(value.part)) {
              this.workshopEvents.push(this.convertEventData(this.parsePart(value.part)));
            }
          }
        }
      });
    } else {
      LOGGER.info(`template not found. Ignore Session with id: ${this.pageid}`);
    }

    if (parsedXML.root.hasOwnProperty('#text')) {
      this.rawDescription = parsedXML.root['#text'];
    }
  }

  private convertEventData(event): WorkshopEvent {
    const knownKeys = [
      'GUID', 'Has duration', 'Has session location', 'Has start time', 'Has subtitle'
    ];

    Object.keys(event).forEach(key => {
      if (knownKeys.indexOf(key) < 0) {
        LOGGER.warn(`Unknown event key found: ${key}`);
      }
    });

    const guid = event['GUID'];
    const duration = event['Has duration'];
    const location = event['Has session location'];
    const start = event['Has start time'];

    const workshopEvent = new WorkshopEvent(guid, start, duration, location);

    if (event.hasOwnProperty('Has subtitle')) {
      workshopEvent.subtitle = event['Has subtitle'];
    }

    return workshopEvent;
  }

  private convertSessionData(extendedSessionData: object): void {

    const knownKeys = [
      'Has description', 'Has orga contact', 'Has session keywords', 'Has session tag',
      'Has session type', 'Has website', 'Held in language', 'Is for kids',
      'Is organized by', 'Processed by assembly', 'Is related to'
    ];

    Object.keys(extendedSessionData).forEach(key => {
      if (knownKeys.indexOf(key) < 0) {
        LOGGER.warn(`Unknown session key "${key}" found on pageId: ${this.pageid}`);
      }
    });

    this.description = extendedSessionData['Has description'];
    this.orgaContact = extendedSessionData['Has orga contact'];
    if (extendedSessionData.hasOwnProperty('Has session keywords')) {
      this.keywords = extendedSessionData['Has session keywords'].split(',');
    }
    if (extendedSessionData.hasOwnProperty('Has session tag')) {
      this.tags = extendedSessionData['Has session tag'].split(',');
    }
    this.sessionType = extendedSessionData['Has session type'];
    this.website = extendedSessionData['Has website'];
    this.language = extendedSessionData['Held in language'];
    this.forKids = extendedSessionData['Is for kids'];
    this.organizedBy = extendedSessionData['Is organized by'];
    this.processedByAssembly = extendedSessionData['Processed by assembly'];
    this.isRelatedTo = extendedSessionData['Is related to'];
  }

  private parsePart(raw: any[]): any {
    const result = {};
    raw.forEach(entry => {
      result[entry.name.trim()] = entry.value;
    });
    return result;
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

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get revisionId(): number {
    return this._revisionId;
  }

  set revisionId(value: number) {
    this._revisionId = value;
  }

  get rawSessionData(): string {
    return this._rawSessionData;
  }

  set rawSessionData(value: string) {
    this._rawSessionData = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get orgaContact(): string {
    return this._orgaContact;
  }

  set orgaContact(value: string) {
    this._orgaContact = value;
  }

  get organizedBy(): string {
    return this._organizedBy;
  }

  set organizedBy(value: string) {
    this._organizedBy = value;
  }

  get tags(): string[] {
    return this._tags;
  }

  set tags(value: string[]) {
    this._tags = value;
  }

  get keywords(): string[] {
    return this._keywords;
  }

  set keywords(value: string[]) {
    this._keywords = value;
  }

  get website(): string {
    return this._website;
  }

  set website(value: string) {
    this._website = value;
  }

  get language(): string {
    return this._language;
  }

  set language(value: string) {
    this._language = value;
  }

  get forKids(): string {
    return this._forKids;
  }

  set forKids(value: string) {
    this._forKids = value;
  }

  get processedByAssembly(): string {
    return this._processedByAssembly;
  }

  set processedByAssembly(value: string) {
    this._processedByAssembly = value;
  }

  get sessionType(): string {
    return this._sessionType;
  }

  set sessionType(value: string) {
    this._sessionType = value;
  }

  get workshopEvents(): WorkshopEvent[] {
    return this._workshopEvents;
  }

  set workshopEvents(value: WorkshopEvent[]) {
    this._workshopEvents = value;
  }

  get rawDescription(): string {
    return this._rawDescription;
  }

  set rawDescription(value: string) {
    this._rawDescription = value;
  }

  get isRelatedTo(): string {
    return this._isRelatedTo;
  }

  set isRelatedTo(value: string) {
    this._isRelatedTo = value;
  }
}
