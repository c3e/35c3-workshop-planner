export default class Location extends Object {

  private _name: string;
  private _subLocations: Location[] = [];

  constructor(name: string, subLocations: Location[] = []) {
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

  get subLocations(): Location[] {
    return this._subLocations;
  }

  set subLocations(value: Location[]) {
    this._subLocations = value;
  }

  public getPrintName(): string {
    return this.name.substr(this.name.indexOf(':') + 1);
  }

  public toString(): string {
    return this.getPrintName();
  }

  public containsLocation(location: string): boolean {
    if (this.name === location) {
      return true;
    }
    return this.subLocations.some(l => (l.name === location));
  }
}
