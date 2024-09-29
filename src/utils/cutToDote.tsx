const cutToDote = (num: string) => {
  if (num.includes('.')) {
    num = num.slice(0, num.lastIndexOf('.') + 3);
  }

  return num;
};

export default cutToDote;
