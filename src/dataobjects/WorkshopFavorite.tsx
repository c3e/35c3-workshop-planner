import WorkshopSession from './WorkshopSession';
import WorkshopEvent from './WorkshopEvent';
import { getBooleanProp, getObjectProp } from '../helper/TypeOf';

export default class WorkshopFavorite extends Object {

  private _stillExists: boolean = true;
  private _workshopSession: WorkshopSession;
  private _workshopEvent: WorkshopEvent;

  constructor(workshopSession: WorkshopSession, workshopEvent: WorkshopEvent) {
    super();
    this._workshopSession = workshopSession;
    this._workshopEvent = workshopEvent;
  }

  static buildFromStoreObject(raw: any): WorkshopFavorite {
    const stillExists = getBooleanProp(raw, '_stillExists');
    const session = getObjectProp(raw, '_workshopSession');
    const event = getObjectProp(raw, '_workshopEvent');
    const workshopSession = WorkshopSession.buildFromStoreObject(session);
    const workshopEvent = WorkshopEvent.buildFromStoreObject(event, workshopSession.pageid);

    const result = new WorkshopFavorite(workshopSession, workshopEvent);
    result.stillExists = stillExists;
    return result;
  }

  get workshopSession(): WorkshopSession {
    return this._workshopSession;
  }

  set workshopSession(value: WorkshopSession) {
    this._workshopSession = value;
  }

  get workshopEvent(): WorkshopEvent {
    return this._workshopEvent;
  }

  set workshopEvent(value: WorkshopEvent) {
    this._workshopEvent = value;
  }

  get stillExists(): boolean {
    return this._stillExists;
  }

  set stillExists(value: boolean) {
    this._stillExists = value;
  }

  public equals(workshopFavorite?: WorkshopFavorite): boolean {
    if (workshopFavorite === undefined || workshopFavorite === null) {
      return false;
    }
    return this.workshopSession.equals(workshopFavorite.workshopSession) &&
           this.workshopEvent.equals(workshopFavorite.workshopEvent);
  }

  public toString(): string {
    return JSON.stringify({ workshopSession: this.workshopSession, workshopEvent: this.workshopEvent });
  }
}
