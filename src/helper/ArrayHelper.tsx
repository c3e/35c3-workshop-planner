
/**
 * Returns an array with arrays of the given size.
 */
export function chunkArray<T extends object>(myArray: T[], chunkSize: number): T[][] {
  const arrayLength = myArray.length;
  const tempArray = [];

  for (let index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = myArray.slice(index, index + chunkSize);
    // Do something if you want with the group
    tempArray.push(myChunk);
  }

  return tempArray;
}