/**
 * Slice number
 * @param {string} value - the value to slice
 * @param {number} decimals - characters after dote
 */
const sliceDecimals = (value: string, decimals: number = 6) => {
  const tempValue = value.replace(',', '.');

  const splitValue = tempValue.split('.');
  if (decimals === 0) {
    return splitValue[0];
  }
  if (splitValue[1]) {
    splitValue[1] = splitValue[1].slice(0, decimals);
  }
  return splitValue.join('.');
};

export default sliceDecimals;
