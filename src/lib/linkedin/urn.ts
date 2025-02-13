export function getLinkedInAuthorUrn(id?: string) {
  return `urn:li:person:${id}`;
}

export function getLinkedInUrnLastPart(urn: string) {
  return urn.split(':').pop();
}
