const roundNumber = (num: string) => {
  if (num.includes(',')) {
    num = num.replace('.', '');
  }

  num = num.replace(',', '.');
  num = Number(num).toFixed(2);

  return num.replace('.', ',');
};

export default roundNumber;
