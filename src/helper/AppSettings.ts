import { AvailableLanguages } from '../i18n/AvailableLanguages';
import { retrieveData, StorageKeys } from '../persist/Storage';

export default class AppSettings {

  private static _OFFLINE_DEBUG = false;

  private static _LANGUAGE: AvailableLanguages = AvailableLanguages.en;

  static async init(): Promise<AvailableLanguages> {
    const storedLang = await retrieveData(StorageKeys.LANGUAGE);
    console.log(storedLang);
    if (storedLang === null || storedLang === '0') {
      AppSettings.LANGUAGE = AvailableLanguages.en;
    } else if (storedLang === '1') {
      AppSettings.LANGUAGE = AvailableLanguages.de;
    }
    return Promise.resolve(AppSettings.LANGUAGE);
  }

  static get OFFLINE_DEBUG(): boolean {
    return this._OFFLINE_DEBUG;
  }

  static get LANGUAGE(): AvailableLanguages {
    return this._LANGUAGE;
  }

  static set LANGUAGE(lang: AvailableLanguages) {
    this._LANGUAGE = lang;
  }
}

