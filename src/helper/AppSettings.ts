export default class AppSettings {

  private static _OFFLINE_DEBUG = false;

  static get OFFLINE_DEBUG(): boolean {
    return this._OFFLINE_DEBUG;
  }

  static set OFFLINE_DEBUG(value: boolean) {
    this._OFFLINE_DEBUG = value;
  }
}