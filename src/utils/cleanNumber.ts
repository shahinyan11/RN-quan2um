const cleanNumber = (value: string) => {
  let result = value.replace(',', '.');

  if (result[0] === '.') {
    return '';
  }

  const parts = result.split('.');

  if (parts.length > 2) {
    const firstPart = parts.shift();
    const remainingPart = parts.join('');
    result = firstPart + '.' + remainingPart.replace(/\./g, '');
  }

  return result;
};

export default cleanNumber;
