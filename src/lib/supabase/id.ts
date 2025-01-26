export function hasId<T>(obj: T): obj is T & { id: string } {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}
