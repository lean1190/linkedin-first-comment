import { format } from 'date-fns';

export function formatDateForSchedule(date?: Date | string) {
    const formatDate = !date ?
        new Date() :
        typeof date === 'string' ?
            new Date(date) :
            date;

    return format(formatDate, 'EEE, MMM d, hh:mm a');
}
