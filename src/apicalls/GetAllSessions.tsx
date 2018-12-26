import { Dispatch } from 'redux';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LOGGER from '../utils/Logger';
import { workshopsLoaded } from '../store/global/actions';
import AppSettings from '../helper/AppSettings';
import GetSessionsData from './GetSessionsData';

export default class GetAllSessions {

  // wiki api url for all sessions
  private static API_URL = 'https://events.cccccc.de/congress/2018/wiki/api.php?action=query&format=json&list=categorymembers&cmprop=ids|title|type|sortkey|timestamp&cmlimit=5000&cmtitle=Category:Session';

  private _dispatcher: Dispatch;
  private _getSessionsData: GetSessionsData;

  constructor(dispatcher: Dispatch) {
    this._dispatcher = dispatcher;
    this._getSessionsData = new GetSessionsData(dispatcher);
  }

  set dispatcher(value: Dispatch) {
    this._dispatcher = value;
  }

  get dispatcher(): Dispatch {
    return this._dispatcher;
  }

  set getSessionsData(value: GetSessionsData) {
    this._getSessionsData = value;
  }

  get getSessionsData(): GetSessionsData {
    return this._getSessionsData;
  }

  getSessions(): Promise<WorkshopSession[]> {
    return new Promise(async (resolve, reject) => {

      if (AppSettings.OFFLINE_DEBUG) {
        const result = require('../helper/offlineBackup.json');
        const workshops: WorkshopSession[] = [];
        result.forEach((w: any) => {
          workshops.push(WorkshopSession.buildFromStoreObject(w));
        });
        this.dispatcher(workshopsLoaded(workshops));
        resolve(workshops);
        return;
      }

      fetch(GetAllSessions.API_URL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status !== 200) {
          LOGGER.error(`Error on GetAllSessions call: ${response.statusText}`);
          alert('Hopla, da ist etwas schief gelaufen beim abrufen der Sessions');
          reject(response.statusText);
        } else {
          const workshops: WorkshopSession[] = [];
          response.json().then((json: any) => {
            const members: Object[] = json.query.categorymembers;
            LOGGER.info(`Found ${members.length} Sessions`);
            members.forEach((session: object) => {
              workshops.push(WorkshopSession.buildFromApiObject(session));
            }, members);

            this.getSessionsData.getSessionData(workshops).then((workshops) => {
              this.dispatcher(workshopsLoaded(workshops));
              resolve(workshops);
            }).catch(e => {
              reject(`Error parsing JSON: ${e.toString()}`);
            });
          }).catch((reason) =>
              reject(`Error parsing JSON: ${reason.toString()}`)
          );
        }
      }).catch((reason => {
        LOGGER.error(`Cannot get device ids. Reason: ${reason}`);
        reject(reason);
      }));
    });
  }
}
