import { IconCaretDownFilled } from '@tabler/icons-react';
import { useMemo } from 'react';

import { formatDateForSchedule } from '@/lib/date/format';
import { getTimeZoneDetails, transformDateToTimezone } from '@/lib/date/timezone';

import type { FormViewport } from '../types';

interface Props {
  schedule?: string;
  viewport: FormViewport;
}

export const TimezoneLine = ({
  schedule,
  timezone,
  showLocation
}: Pick<Props, 'schedule'> & {
  timezone?: string;
  showLocation: boolean;
}) => (
  <div>
    <span>{formatDateForSchedule(schedule)}</span>
    <span> {getTimeZoneDetails(timezone).timeZoneName}</span>
    {showLocation ? <span>, based on your location</span> : null}
  </div>
);

export default function Timezone({ schedule, viewport }: Props) {
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
    <details className="text-sm text-linkedin-low-emphasis transition-all [&_i]:open:-rotate-180">
      <summary className="flex cursor-pointer items-center gap-1">
        <TimezoneLine schedule={schedule} showLocation={viewport === 'desktop'} />
        <i className="transition-all">
          <IconCaretDownFilled size={15} />
        </i>
      </summary>
      <div className="py-4 font-thin">
        <TimezoneLine
          schedule={timeInPacific}
          timezone="America/Los_Angeles"
          showLocation={false}
        />
        <TimezoneLine
          schedule={timeInArgentina}
          timezone="America/Argentina/Buenos_Aires"
          showLocation={false}
        />
        <TimezoneLine schedule={timeInBerlin} timezone="Europe/Berlin" showLocation={false} />
        <TimezoneLine
          schedule={timeInKualaLumpur}
          timezone="Asia/Kuala_Lumpur"
          showLocation={false}
        />
      </div>
    </details>
  );
}
