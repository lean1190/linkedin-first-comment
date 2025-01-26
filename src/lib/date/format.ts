import { UTCDate } from '@date-fns/utc';
import { format } from 'date-fns';

export function formatDateForSchedule(date?: Date | string) {
  const formatDate = !date ? new Date() : typeof date === 'string' ? new Date(date) : date;

  return format(formatDate, 'EEE, MMM d, hh:mm a');
}

export function toUtcISOStringDate(date?: Date | string) {
  return date ? new UTCDate(date).toISOString() : null;
}
