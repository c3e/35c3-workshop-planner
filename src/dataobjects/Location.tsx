export default class Location extends Object {

  private _name: string;
  private _subLocations: string[] = [];

  constructor(name: string, subLocations: string[] = []) {
    super();
    this._name = name;
    this._subLocations = subLocations;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get subLocations(): string[] {
    return this._subLocations;
  }

  set subLocations(value: string[]) {
    this._subLocations = value;
  }

  public getPrintName(): string {
    return this.name.substr(this.name.indexOf(':') + 1);
  }

  public toString(): string {
    return this.getPrintName();
  }
}
