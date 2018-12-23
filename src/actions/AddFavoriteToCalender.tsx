import { Calendar, Permissions } from 'expo';
import LOGGER from '../utils/Logger';
import t from '../i18n/Translator';
import { Alert } from 'react-native';

export interface SimpleCalendar {
  id: string;
  title: string;
}

export default function getCalendarsFromSystem(): Promise<SimpleCalendar[]> {
  return new Promise(((resolve, reject) => {
    Permissions.askAsync(Permissions.CALENDAR).then((response: Permissions.PermissionResponse) => {
      LOGGER.info(`Response from Permission request for calendar: ${response}`);
      if (response.status !== 'granted') {
        Alert.alert(
            t('Access to your calendar'),
            t('I cannot write an event to your calendar if you deny me access to your calendar.'),
            [{ text: 'OK' }],
            { cancelable: true }
        );
        reject('access deny');
      } else {
        Calendar.getCalendarsAsync().then((calendars) => {
          const simpleCalendars: SimpleCalendar[] = [];
          calendars.map((c) => {
            if (c.id !== undefined && c.title !== undefined) {
              simpleCalendars.push({ id: c.id, title: c.title });
            }
          });
          resolve(simpleCalendars);
        }).catch((error) => reject(error));
      }
    }).catch((error) => {
      LOGGER.error(`error on request for calendar permission: ${error}`);
    });
  }));
}
