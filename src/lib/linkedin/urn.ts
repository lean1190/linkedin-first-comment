export function getLinkedInAuthorUrn(id?: string) {
  return `urn:li:person:${id}`;
}

export function getLinkedInUrnId(urn: string) {
  return urn.split(':').pop();
}
