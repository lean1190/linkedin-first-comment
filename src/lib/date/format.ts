import { UTCDate } from '@date-fns/utc';
import { format as dateFnsFormat, formatRelative, isMatch, parse } from 'date-fns';
import { enUS } from 'date-fns/locale';

type StringOrDate = string | Date;

const baseDateStringFormat = 'MM/dd/yyyy';

export function stringOrDateToDate(theDate: StringOrDate) {
  return typeof theDate === 'string' ? new Date(theDate) : theDate;
}

export function isFullDate(stringDate: string) {
  return isMatch(stringDate, baseDateStringFormat);
}

export function capitalizeString(stringDate: string) {
  return `${stringDate.charAt(0).toUpperCase()}${stringDate.slice(1)}`;
}

export function invertMonthsAndDays(theDate: string, relativeTo: Date) {
  return dateFnsFormat(
    parse(theDate, baseDateStringFormat, relativeTo, { locale: enUS }),
    'dd/MM/yyyy'
  );
}

export function getRelativeDate(theDate: StringOrDate, relativeTo: Date) {
  const dateToFormat = stringOrDateToDate(theDate);

  const initialFormattedDate = formatRelative(dateToFormat, relativeTo, { locale: enUS });

  return isFullDate(initialFormattedDate)
    ? invertMonthsAndDays(initialFormattedDate, relativeTo)
    : capitalizeString(initialFormattedDate);
}

export function getRelativeDateWithoutTime(theDate: StringOrDate, relativeTo: Date) {
  return getRelativeDate(theDate, relativeTo).replace(/ at.*/g, '');
}

export function formatDate(theDate: StringOrDate, format = 'yyyy-MM-dd') {
  const dateToFormat = stringOrDateToDate(theDate);

  return dateFnsFormat(dateToFormat, format, { locale: enUS });
}

export function dateInputToISOString(dateInput: string | undefined) {
  if (!dateInput) {
    return;
  }

  return new Date(dateInput).toISOString();
}

export function formatDateForSchedule(date?: Date | string) {
  const formatDate = !date ? new Date() : stringOrDateToDate(date);

  return dateFnsFormat(formatDate, 'EEE, MMM d, hh:mm a');
}

export function formatDateForInput(date?: Date | string) {
  const formatDate = !date ? new Date() : stringOrDateToDate(date);

  return dateFnsFormat(formatDate, "yyyy-MM-dd'T'HH:mm");
}

export function toUtcISOStringDate(date?: Date | string) {
  return date ? new UTCDate(date).toISOString() : null;
}
