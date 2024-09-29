import numeral from 'numeral';

const formatNumber = (num: number | string) => {
  const formattedString = String(num).split('.');
  let [numerator, denominator] = formattedString;

  return `${numeral(numerator).format('0,0')}.${denominator || '0'}`;
};

export default formatNumber;
