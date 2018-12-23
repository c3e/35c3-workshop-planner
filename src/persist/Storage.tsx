import { AsyncStorage } from 'react-native';
import LOGGER from '../utils/Logger';

export async function storeData (key: StorageKeys, value: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(`WORKSHOP_PLANNER:${key}`, JSON.stringify(value));
    LOGGER.info(`Successfully stored values for key "${key}"`);
    return Promise.resolve(true);
  } catch (error) {
    LOGGER.error(`Error on store value for key "${key}"`);
    return Promise.reject(false);
  }
}

export async function retrieveData (key: StorageKeys): Promise<string | null> {
  try {
    const value = await AsyncStorage.getItem(`WORKSHOP_PLANNER:${key}`);
    if (value === null) {
      LOGGER.error(`No value found for key "${key}"`);
      return value;
    }
    return value;
  } catch (error) {
    // Error retrieving data
    LOGGER.error(`Error on get value from store for key "${key}"`);
  }
  return null;
}

export enum StorageKeys {
  'SETTINGS' = 'SETTINGS',
  'SESSIONS' = 'SESSIONS',
  'FAVORITES' = 'FAVORITES',
  'LANGUAGE' = 'LANGUAGE'
}
