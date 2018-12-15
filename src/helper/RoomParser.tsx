import WorkshopSession from '../dataobjects/WorkshopSession';
import { onlyUnique } from './ArrayHelper';

export function parseRoomsFrom(workshops: WorkshopSession[]): string[] {
  const locations: string[] = [];

  workshops.forEach(ws => {
    if (!Array.isArray(ws.workshopEvents)) {
      console.log(ws);
    } else {
      ws.workshopEvents.forEach(event => {
        if (event.location !== undefined && event.location !== null) {
          locations.push(event.location);
        }
      });
    }
  });

  return locations.filter(onlyUnique);
}
