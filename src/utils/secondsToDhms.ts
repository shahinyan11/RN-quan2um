import moment from 'moment';
import {formatDate} from './fns';

export const ZERO_DATE_VALUE = '00';

export const secondsToDhms = (seconds: number) => {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (1000 * 60 * 60 * 24));
  const h = Math.floor((seconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((seconds % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((seconds % (1000 * 60)) / 1000);

  const addZero = (number: number) =>
    number < 10 ? `0${number}` : number.toString();

  return {
    d: d > 0 ? addZero(d) : ZERO_DATE_VALUE,
    h: h > 0 ? addZero(h) : ZERO_DATE_VALUE,
    m: m > 0 ? addZero(m) : ZERO_DATE_VALUE,
    s: s > 0 ? addZero(s) : ZERO_DATE_VALUE,
  };
};
