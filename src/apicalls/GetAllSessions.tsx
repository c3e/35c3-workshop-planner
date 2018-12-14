import { Dispatch } from 'redux';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LOGGER from '../utils/Logger';
import { workshopsLoaded } from '../store/global/actions';
import AppSettings from '../helper/AppSettings';
import GetSessionsData from './GetSessionsData';

export default class GetAllSessions {

  // wiki api url for all sessions
  private static API_URL = 'https://events.ccc.de/congress/2017/wiki/api.php?action=query&format=json&list=categorymembers&cmprop=ids|title|type|sortkey|timestamp&cmlimit=5000&cmtitle=Category:Session';

  private static OFFLINE_DEBUG_LIST: WorkshopSession[] = [
    new WorkshopSession(2081, 502, 'Session:"Pen&Paper" Game Jam','2250454e265041504552222047414d45204a414d', 'page', '2017-12-22T17:19:06Z', {}),
    new WorkshopSession(2195,502,'Session:(Wie) Audible Magic hacken?', '28574945292041554449424c45204d41474943204841434b454e3f','page','2017-12-24T01:05:25Z', {})
  ];

  private _dispatcher: Dispatch;
  private _getSessionsData: GetSessionsData;

  constructor(dispatcher: Dispatch) {
    this.dispatcher = dispatcher;
    this.getSessionsData = new GetSessionsData(dispatcher);
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

        resolve(GetAllSessions.OFFLINE_DEBUG_LIST);
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

            this.getSessionsData.getSessionData(workshops).then((ws) => {
              LOGGER.verbose(ws);
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
