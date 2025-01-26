import { toUtcISOStringDate } from '@/lib/date/format';
import type { z } from 'zod';
import type { formSchema } from './schemas';

export function mapFormToAction({
  content,
  schedule,
  reshare,
  comment
}: z.infer<typeof formSchema>) {
  return {
    content,
    scheduleUtc: toUtcISOStringDate(schedule),
    reshareScheduleUtc: toUtcISOStringDate(reshare),
    comment: comment ?? null
  };
}
