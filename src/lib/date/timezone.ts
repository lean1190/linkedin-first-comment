export function getTimeZoneDetails(timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { timeZone, timeZoneName: 'long' };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDate = formatter.formatToParts(date);
    const timeZoneName = formattedDate.find((part) => part.type === 'timeZoneName')?.value;

    return {
        timeZoneIdentifier: timeZone,
        timeZoneName: timeZoneName || 'Unknown Timezone'
    };
}
