export function getCurrentTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getTimeZoneDetails(timeZone = getCurrentTimezone()) {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    timeZone,
    timeZoneName: 'long'
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const formattedDate = formatter.formatToParts(date);
  const timeZoneName = formattedDate.find((part) => part.type === 'timeZoneName')?.value;

  return {
    timeZoneIdentifier: timeZone,
    timeZoneName: timeZoneName || 'Unknown Timezone'
  };
}

export function transformDateToTimezone({
  dateString,
  targetTimezone
}: {
  dateString?: string;
  targetTimezone: string;
}) {
  const date = new Date(dateString || new Date().toISOString());

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: targetTimezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const parts = formatter.formatToParts(date);
  const year = parts.find((p) => p.type === 'year')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  const hour = parts.find((p) => p.type === 'hour')?.value;
  const minute = parts.find((p) => p.type === 'minute')?.value;
  const second = parts.find((p) => p.type === 'second')?.value;

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
