/**
 * Increase the number for 0.1
 * @param {string} number
 */
const increase = (number: string = '0') => {
  let numberStr = number;

  if (numberStr.endsWith('.')) {
    numberStr = numberStr.slice(0, -1);
  }

  const sliced = numberStr.split('.');
  if (sliced[1]) {
    if (sliced[1][0] === '9') {
      sliced[1] = sliced[1].replace('9', '0');
      sliced[0] = String(+sliced[0] + 1);
    } else {
      const char0 = sliced[1].slice(0, 1);
      const after0 = sliced[1].slice(1);

      sliced[1] = `${String(+char0 + 1)}${after0}`;
    }
  } else {
    sliced[0] = String(+sliced[0] + 0.1);
  }

  return sliced.join('.');
};

export default increase;
