export function countWords(str?: string) {
  return str?.split(' ').filter((n) => n !== '').length ?? 0;
}

export function countCharacters(str?: string) {
  return str?.length ?? 0;
}
