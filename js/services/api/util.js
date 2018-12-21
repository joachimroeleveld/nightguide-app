import dateFnsFormat from 'date-fns/format';

export function formatDate(date) {
  return dateFnsFormat(date, 'YYYY-MM-DD');
}
