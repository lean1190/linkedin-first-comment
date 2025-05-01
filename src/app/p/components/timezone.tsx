import { IconCaretDownFilled } from '@tabler/icons-react';
import { useMemo } from 'react';

import { formatDateForSchedule } from '@/lib/date/format';
import {
  getCurrentTimezone,
  getTimeZoneDetails,
  transformDateToTimezone
} from '@/lib/date/timezone';

interface Props {
  schedule?: string;
}

export const TimezoneLine = ({
  schedule,
  timezone,
  className = ''
}: Pick<Props, 'schedule'> & {
  timezone?: string;
  className?: string;
}) => (
  <div className={className}>
    <span>{formatDateForSchedule(schedule)}</span>
    <span> {getTimeZoneDetails(timezone).timeZoneName}</span>
  </div>
);

const TimezoneRow = ({
  schedule,
  timezone
}: Pick<Props, 'schedule'> & {
  timezone?: string;
}) => (
  <tr className="border-b text-xs sm:text-sm">
    <td className="py-2">{getTimeZoneDetails(timezone).timeZoneName}</td>
    <td className="py-2 text-right">{formatDateForSchedule(schedule)}</td>
  </tr>
);

export default function Timezone({ schedule }: Props) {
  const timeLocal = useMemo(
    () =>
      transformDateToTimezone({
        dateString: schedule,
        targetTimezone: getCurrentTimezone()
      }),
    [schedule]
  );

  const timeInPacific = useMemo(
    () =>
      transformDateToTimezone({
        dateString: schedule,
        targetTimezone: 'America/Los_Angeles'
      }),
    [schedule]
  );

  const timeInArgentina = useMemo(
    () =>
      transformDateToTimezone({
        dateString: schedule,
        targetTimezone: 'America/Argentina/Buenos_Aires'
      }),
    [schedule]
  );

  const timeInBerlin = useMemo(
    () =>
      transformDateToTimezone({
        dateString: schedule,
        targetTimezone: 'Europe/Berlin'
      }),
    [schedule]
  );

  const timeInKualaLumpur = useMemo(
    () =>
      transformDateToTimezone({
        dateString: schedule,
        targetTimezone: 'Asia/Kuala_Lumpur'
      }),
    [schedule]
  );

  return (
    <details className="text-sm text-linkedin-low-emphasis transition-all open:[&_i]:-rotate-180">
      <summary className="flex cursor-pointer items-center gap-1">
        <TimezoneLine schedule={timeLocal} />
        <i className="transition-all">
          <IconCaretDownFilled size={15} />
        </i>
      </summary>
      <table className="my-4 font-thin w-full">
        <tbody>
          <TimezoneRow schedule={timeInPacific} timezone="America/Los_Angeles" />
          <TimezoneRow schedule={timeInArgentina} timezone="America/Argentina/Buenos_Aires" />
          <TimezoneRow schedule={timeInBerlin} timezone="Europe/Berlin" />
          <TimezoneRow schedule={timeInKualaLumpur} timezone="Asia/Kuala_Lumpur" />
        </tbody>
      </table>
    </details>
  );
}
