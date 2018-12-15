import { AvailableLanguages } from '../i18n/AvailableLanguages';

export default class AppSettings {

  private static _OFFLINE_DEBUG = true;

  private static _LANGUAGE: AvailableLanguages = AvailableLanguages.de;

  static get OFFLINE_DEBUG(): boolean {
    return this._OFFLINE_DEBUG;
  }

  static get LANGUAGE(): AvailableLanguages {
    return this._LANGUAGE;
  }
}
