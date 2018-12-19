import GetAllSessions from '../apicalls/GetAllSessions';
import LOGGER from '../utils/Logger';
import { Dispatch } from 'redux';
import { lastApiUpdateChanged, workshopsLoaded } from '../store/global/actions';
import WorkshopSession from '../dataobjects/WorkshopSession';
import { retrieveData, StorageKeys } from '../persist/Storage';

export async function loadWorkshopData(dispatch: Dispatch, lastUpdate: number,
                                 updateFrequency: number, forceLoad: boolean = false,
                                 loadFromStore: boolean = false): Promise<void> {
  if (loadFromStore) {
    LOGGER.debug('Start loading workshops from store');
    try {
      const loadedFromStore = await retrieveData(StorageKeys.WORKSHOP_PLANNER_SESSION_LIST);
      const workshops: WorkshopSession[] = [];
      if (loadedFromStore !== null) {
        JSON.parse(loadedFromStore).forEach((w: any) => {
          workshops.push(WorkshopSession.buildFromStoreObject(w));
        });
        dispatch(workshopsLoaded(workshops));
      }
    } catch (e) {
      LOGGER.error(`Cannot load from store: ${e}`);
    }
  }

  if (Date.now() > lastUpdate + updateFrequency || forceLoad) {
    new GetAllSessions(dispatch).getSessions().then((sessions) => {
      LOGGER.info(`Loaded ${sessions.length} Workshop Sessions`);
      dispatch(lastApiUpdateChanged(Date.now()));
    }).catch((e) => {
      LOGGER.error(`Failed to load sessions. Error: ${e}`);
    });
  } else {
    LOGGER.debug('loadWorkshopData called but last update is to new');
  }
}
