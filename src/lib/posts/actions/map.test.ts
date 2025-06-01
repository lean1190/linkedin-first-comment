import { describe, expect, it } from 'vitest';
import { mapFormPostToDatabase } from './map';

describe('mapFormPostToDatabase', () => {
  it('should map required fields (id, content)', () => {
    const input = { id: '1', content: 'Hello' };
    const result = mapFormPostToDatabase(input);
    expect(result).toEqual({ id: '1', content: 'Hello' });
  });

  it('should map all fields when present', () => {
    const input = {
      id: '2',
      content: 'World',
      comment: 'A comment',
      scheduleUtc: '2025-01-01T00:00:00Z',
      reshareScheduleUtc: '2025-01-02T00:00:00Z',
      status: 'scheduled' as const,
      urn: 'urn:li:activity:123'
    };
    const result = mapFormPostToDatabase(input);
    expect(result).toEqual({
      id: '2',
      content: 'World',
      comment: 'A comment',
      post_at_utc: '2025-01-01T00:00:00Z',
      repost_at_utc: '2025-01-02T00:00:00Z',
      status: 'scheduled',
      urn: 'urn:li:activity:123'
    });
  });

  it('should include fields with null values', () => {
    const input = {
      id: '3',
      content: 'Test',
      comment: null,
      scheduleUtc: null,
      reshareScheduleUtc: null,
      status: null,
      urn: null
    };
    // @ts-expect-error: status can be null for test
    const result = mapFormPostToDatabase(input);
    expect(result).toEqual({
      id: '3',
      content: 'Test',
      comment: null,
      post_at_utc: null,
      repost_at_utc: null,
      status: null,
      urn: null
    });
  });

  it('should not include optional fields if they are undefined', () => {
    const input = {
      id: '4',
      content: 'No optionals',
      comment: undefined,
      scheduleUtc: undefined,
      reshareScheduleUtc: undefined,
      status: undefined,
      urn: undefined
    };
    const result = mapFormPostToDatabase(input);
    expect(result).toEqual({ id: '4', content: 'No optionals' });
  });
});
