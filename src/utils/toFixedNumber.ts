const toFixedNumber = (num: number) => {
  const fixedNum = num.toFixed(10);
  // removed all "0" from the end
  return fixedNum.replace(/\.?0+$/, '');
};

export default toFixedNumber;
