import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCurrentTimezone, getTimeZoneDetails, transformDateToTimezone } from './timezone';

describe('getCurrentTimezone', () => {
  it('should return the current system timezone', () => {
    const timeZone = getCurrentTimezone();
    expect(typeof timeZone).toBe('string');
    expect(timeZone.length).toBeGreaterThan(0);
  });
});

describe('getTimeZoneDetails', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the correct timezone identifier and name for a given timezone', () => {
    const details = getTimeZoneDetails('America/New_York');
    expect(details.timeZoneIdentifier).toBe('America/New_York');
    expect(typeof details.timeZoneName).toBe('string');
    expect(details.timeZoneName.length).toBeGreaterThan(0);
  });

  it('should return the current timezone details when no argument is provided', () => {
    const details = getTimeZoneDetails();
    expect(typeof details.timeZoneIdentifier).toBe('string');
    expect(details.timeZoneIdentifier.length).toBeGreaterThan(0);
    expect(typeof details.timeZoneName).toBe('string');
    expect(details.timeZoneName.length).toBeGreaterThan(0);
  });

  it('should return "Unknown Timezone" when the timezone name cannot be resolved', () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts').mockReturnValue([
      { type: 'year', value: '2024' }
    ]);

    const details = getTimeZoneDetails('Invalid/Timezone');
    expect(details.timeZoneIdentifier).toBe('Invalid/Timezone');
    expect(details.timeZoneName).toBe('Unknown Timezone');
  });

  it('should return "Unknown Timezone" if timeZoneName is missing from formatToParts result', () => {
    vi.spyOn(Intl.DateTimeFormat.prototype, 'formatToParts').mockReturnValue([
      { type: 'year', value: '2025' }
      // No timeZoneName in the array
    ]);

    const result = getTimeZoneDetails('America/New_York');

    expect(result).toEqual({
      timeZoneIdentifier: 'America/New_York',
      timeZoneName: 'Unknown Timezone'
    });
  });
});

describe('transformDateToTimezone', () => {
  it('should convert a given date to the target timezone format', () => {
    const result = transformDateToTimezone({
      dateString: '2024-02-13T12:00:00Z',
      targetTimezone: 'America/New_York'
    });

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  it('should use the current date when no dateString is provided', () => {
    const result = transformDateToTimezone({ targetTimezone: 'America/New_York' });
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  it('should correctly handle an invalid date input by returning a formatted string', () => {
    const result = transformDateToTimezone({
      dateString: 'invalid-date',
      targetTimezone: 'America/New_York'
    });

    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });
});
