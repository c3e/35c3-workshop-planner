import { Dispatch } from 'redux';
import WorkshopSession from '../dataobjects/WorkshopSession';
import LOGGER from '../utils/Logger';
import AppSettings from '../helper/AppSettings';
import { chunkArray } from '../helper/ArrayHelper';

class Chunk {
  public idList: string;
  public workshops: WorkshopSession[];

  constructor(idList: string, workshops: WorkshopSession[]) {
    this.idList = idList;
    this.workshops = workshops;
  }
}

export default class GetSessionsData {

  // wiki api url for all sessions
  private static API_URL = 'https://events.cccccc.de/congress/2018/wiki/api.php?action=query&prop=revisions&rvprop=ids|timestamp|user|userid|size|tags|parsetree&format=json&pageids=';

  private static OFFLINE_DEBUG_LIST: WorkshopSession[] = [];

  private static CHUNK_SIZE_FOR_API = 50;

  private _dispatcher: Dispatch;

  constructor(dispatcher: Dispatch) {
    this._dispatcher = dispatcher;
  }

  set dispatcher(value: Dispatch) {
    this._dispatcher = value;
  }

  get dispatcher(): Dispatch {
    return this._dispatcher;
  }

  getSessionData(workshops: WorkshopSession[]): Promise<WorkshopSession[]> {
    return new Promise(async (resolve, reject) => {

      if (AppSettings.OFFLINE_DEBUG) {
        resolve(workshops);
        return;
      }

      // build hash map for faster access
      const workshopMap: any = {};
      workshops.map(ws => {
        workshopMap[ws.pageid] = ws;
      });

      // split to chunks
      const querys: Chunk[] = [];
      const chunks = chunkArray(workshops, GetSessionsData.CHUNK_SIZE_FOR_API);

      chunks.map(chunk => {
        const idString = chunk.map(workshopList => workshopList.pageid).join('|');
        querys.push(new Chunk(idString, chunk));
      });

      const promises = querys.map(c => this.fetchForBatch(c));
      Promise.all(promises).then(results => {
        const result = this.flatResults(results);
        LOGGER.debug(`got ${Object.keys(result).length} results`);
        LOGGER.debug(`keys: ${Object.keys(result)}`);
        workshops.forEach(ws => {
          ws.addSessionData(result[ws.pageid]);
        });
        resolve(workshops);
      }).catch(error => {
        LOGGER.error(`could not collect all session data. Error: ${error}`);
        reject(error);
      });
    });
  }

  private fetchForBatch(chunck: Chunk): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const url = GetSessionsData.API_URL + chunck.idList;
      LOGGER.debug(url);
      fetch(GetSessionsData.API_URL + chunck.idList, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status !== 200) {
          LOGGER.error(`Error on GetSessionData call: ${response.statusText}`);
          alert('Hopla, da ist etwas schief gelaufen beim abrufen der Session Daten');
          reject(response.statusText);
        } else {
          response.json().then((json: any) => {
            const pages = json.query.pages;
            LOGGER.info(`Found ${Object.keys(pages).length} Session Data`);
            resolve(pages);
          }).catch((reason) =>
              reject(`Error parsing JSON: ${reason.toString()}`)
          );
        }
      }).catch((reason => {
        LOGGER.error(`Cannot get Session Data. Reason: ${reason}`);
        reject(reason);
      }));
    });
  }

  private flatResults(myArray: any[]): any {
    let result = {};
    myArray.map((e) => {
      result = { ...result, ...e };
    });
    return result;
  }

}
