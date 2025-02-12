import { v4 as uuidv4 } from 'uuid';

export function hasId<T>(obj: T): obj is T & { id: string } {
  return typeof obj === 'object' && obj !== null && 'id' in obj && typeof obj.id === 'string';
}

export function newId() {
  return uuidv4();
}
