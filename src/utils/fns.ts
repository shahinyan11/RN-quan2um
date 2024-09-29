import {format, fromUnixTime} from 'date-fns';

export const formatDate = (date: number, mask = 'yyyy/MM/dd HH:MM:SS') => {
  return format(fromUnixTime(date), mask);
};

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
