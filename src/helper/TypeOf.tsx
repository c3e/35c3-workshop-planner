export function getStringProp(object: any, propertyName: string, defaultVal: string = ''): string {
  if (object.hasOwnProperty(propertyName) && typeof object[propertyName] === 'string') {
    return object[propertyName];
  }
  return defaultVal;
}

export function getObjectProp(object: any, propertyName: string, defaultVal: object = {}): object {
  if (object.hasOwnProperty(propertyName)) {
    return object[propertyName];
  }
  return defaultVal;
}


export function getNumberProp(object: any, propertyName: string, defaultVal: number = 0): number {
  if (object.hasOwnProperty(propertyName) && typeof object[propertyName] === 'number') {
    return object[propertyName];
  }
  return defaultVal;
}

// noinspection JSUnusedGlobalSymbols
export function getBooleanProp(object: any, propertyName: string, defaultVal: boolean = false): boolean {
  if (object.hasOwnProperty(propertyName) && typeof object[propertyName] === 'boolean') {
    return object[propertyName];
  }
  return defaultVal;
}
