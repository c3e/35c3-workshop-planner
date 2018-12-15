import GetAllSessions from '../apicalls/GetAllSessions';
import LOGGER from '../utils/Logger';
import { Dispatch } from 'redux';

export function loadWorkshopData(dispatch: Dispatch): void {
  new GetAllSessions(dispatch).getSessions().then((sessions) => {
    LOGGER.info(`Loaded ${sessions.length} Workshop Sessions`);
  }).catch((e) => {
    LOGGER.error(`Failed to load sessions. Error: ${e}`);
  });
}
