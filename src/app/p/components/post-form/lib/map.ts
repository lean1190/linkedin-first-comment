import { toUtcISOStringDate } from '@/lib/date/format';
import type { FormDraftPost } from '../types';

export function mapFormToAction({ id, content, schedule, reshare, comment }: FormDraftPost) {
  return {
    id,
    content,
    scheduleUtc: toUtcISOStringDate(schedule),
    reshareScheduleUtc: toUtcISOStringDate(reshare),
    comment: comment ?? null,
    urn: null
  };
}
