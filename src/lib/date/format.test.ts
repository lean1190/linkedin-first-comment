import { sub } from 'date-fns';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  capitalizeString,
  dateInputToISOString,
  formatDate,
  formatDateForInput,
  formatDateForSchedule,
  getRelativeDate,
  getRelativeDateWithoutTime,
  invertMonthsAndDays,
  isFullDate,
  stringOrDateToDate,
  toUtcISOStringDate
} from './format';

describe('lib date format', () => {
  const referenceDate = new Date('2023-05-23T15:30:10Z');

  beforeEach(() => {
    vi.useFakeTimers({ now: referenceDate });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('getRelativeDate', () => {
    it('should return a formatted relative date string', () => {
      expect(getRelativeDate('2024-02-06T12:00:00Z', referenceDate)).toBeTypeOf('string');
    });

    it('should handle invalid date input gracefully', () => {
      expect(() => getRelativeDate('invalid-date', referenceDate)).toThrow();
    });
  });

  describe('getRelativeDateWithoutTime', () => {
    it('should return a relative date string without time', () => {
      const result = getRelativeDateWithoutTime('2024-02-06T12:00:00Z', referenceDate);
      expect(result).not.toMatch(/ at.*/);
    });

    it('should handle invalid date input gracefully', () => {
      expect(() => getRelativeDateWithoutTime('invalid-date', referenceDate)).toThrow();
    });
  });

  describe('formatDate', () => {
    it('should return a formatted date string in the default format', () => {
      expect(formatDate('2024-02-07T12:00:00Z')).toMatch(/\d{4}-\d{2}-\d{2}/);
    });

    it('should return a correctly formatted date when a custom format is provided', () => {
      expect(formatDate('2024-02-07T12:00:00Z', 'MM/dd/yyyy')).toBe('02/07/2024');
    });
  });

  describe('dateInputToISOString', () => {
    it('should return an ISO string when given a valid date string', () => {
      expect(dateInputToISOString('2024-02-07')).toBe('2024-02-07T00:00:00.000Z');
    });

    it('should return undefined when given an undefined input', () => {
      expect(dateInputToISOString(undefined)).toBeUndefined();
    });

    it('should return undefined when given an empty string', () => {
      expect(dateInputToISOString('')).toBeUndefined();
    });
  });

  describe('formatDateForSchedule', () => {
    it('should return a formatted date for scheduling', () => {
      expect(formatDateForSchedule(referenceDate)).toMatch(/\w{3}, \w{3} \d+, \d{2}:\d{2} (AM|PM)/);
    });

    it('should use the current date when no date is provided', () => {
      expect(formatDateForSchedule()).toMatch(/\w{3}, \w{3} \d+, \d{2}:\d{2} (AM|PM)/);
    });

    it('should handle a date string correctly', () => {
      expect(formatDateForSchedule('2024-02-07T12:00:00Z')).toMatch(
        /\w{3}, \w{3} \d+, \d{2}:\d{2} (AM|PM)/
      );
    });

    it('should return a correctly formatted date for a string input', () => {
      expect(formatDateForSchedule('2024-02-07T12:00:00')).toBe('Wed, Feb 7, 12:00 PM');
    });

    it('should return a correctly formatted date for a date input', () => {
      expect(formatDateForSchedule(new Date('2024-02-07T12:00:00'))).toBe('Wed, Feb 7, 12:00 PM');
    });
  });

  describe('formatDateForInput', () => {
    it('should return a formatted date for input fields', () => {
      expect(formatDateForInput(referenceDate)).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
    });

    it('should use the current date when no date is provided', () => {
      expect(formatDateForInput()).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
    });

    it('should return a correctly formatted date for a string input', () => {
      expect(formatDateForInput('2024-02-07T12:00:00')).toBe('2024-02-07T12:00');
    });

    it('should return a correctly formatted date for a date input', () => {
      expect(formatDateForInput(new Date('2024-02-07T12:00:00'))).toBe('2024-02-07T12:00');
    });
  });

  describe('toUtcISOStringDate', () => {
    it('should return an ISO string in UTC format', () => {
      expect(toUtcISOStringDate(referenceDate)).toBe('2023-05-23T15:30:10.000Z');
    });

    it('should return null if no date is provided', () => {
      expect(toUtcISOStringDate(undefined)).toBeNull();
    });

    it('should throw an error when given an invalid date', () => {
      expect(() => toUtcISOStringDate('invalid-date')).toThrow();
    });
  });

  describe('stringOrDateToDate', () => {
    it('should return a Date object when given a string date', () => {
      expect(stringOrDateToDate('2024-02-07')).toBeInstanceOf(Date);
    });

    it('should return the same Date object when given a Date instance', () => {
      const date = new Date();
      expect(stringOrDateToDate(date)).toBe(date);
    });
  });

  describe('isFullDate', () => {
    it('should return true for a valid full date string', () => {
      expect(isFullDate('02/07/2024')).toBe(true);
    });

    it('should return false for an invalid date string', () => {
      expect(isFullDate('invalid-date')).toBe(false);
    });
  });

  describe('capitalizeString', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeString('hello')).toBe('Hello');
    });

    it('should leave an already capitalized string unchanged', () => {
      expect(capitalizeString('Hello')).toBe('Hello');
    });
  });

  describe('invertMonthsAndDays', () => {
    it('should invert the month and day in a date string', () => {
      expect(invertMonthsAndDays('02/07/2024', referenceDate)).toBe('07/02/2024');
    });

    it('should throw an error for an invalid date format', () => {
      expect(() => invertMonthsAndDays('invalid-date', referenceDate)).toThrow();
    });
  });

  describe('format', () => {
    describe('getRelativeDate', () => {
      it('should return "Today at..."', () => {
        const today = new Date();
        expect(getRelativeDate(today, referenceDate)).to.contain('Today at');
      });

      it('should return "Yesterday at..."', () => {
        const yesterday = sub(referenceDate, { days: 1 });
        expect(getRelativeDate(yesterday, referenceDate)).to.contain('Yesterday at');
      });

      it('should return the date in the full dd/MM/yyyy format "23/03/2023"', () => {
        const farInTime = sub(referenceDate, { months: 2 });
        expect(getRelativeDate(farInTime, referenceDate)).to.be.equal('23/03/2023');
      });
    });

    describe('getRelativeDateWithoutTime', () => {
      it('should return "Today"', () => {
        const today = new Date();
        expect(getRelativeDateWithoutTime(today, referenceDate)).to.be.equal('Today');
      });

      it('should return "Yesterday"', () => {
        const yesterday = sub(referenceDate, { days: 1 });
        expect(getRelativeDateWithoutTime(yesterday, referenceDate)).to.be.equal('Yesterday');
      });

      it('should return the date in the full dd/MM/yyyy format "23/03/2023"', () => {
        const farInTime = sub(referenceDate, { months: 2 });
        expect(getRelativeDateWithoutTime(farInTime, referenceDate)).to.be.equal('23/03/2023');
      });
    });
  });
});
