export function isDeepEqual<T>(obj1: T, obj2: T): boolean {
  // If both values are strictly equal, return true
  if (obj1 === obj2) {
    return true;
  }

  // If either value is not an object, return false (handles null and non-object types)
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  // Get keys of both objects
  const keys1 = Object.keys(obj1) as (keyof T)[];
  const keys2 = Object.keys(obj2) as (keyof T)[];

  // If number of keys is different, objects are not equal
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check if all keys in obj1 are present in obj2 and their values are equal
  for (const key of keys1) {
    if (!(key in obj2) || !isDeepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
