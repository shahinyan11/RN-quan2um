import {scaledSize} from './scaledSize';

export const getFormData = (data: object) => {
  const formData = new FormData();

  for (let key in data) {
    if (data[key]) {
      formData.append(key, data[key]);
    }
  }

  return formData;
};

export const customSearch = (str: string, subStr: string) => {
  try {
    const regexString = `.*${subStr}.*`;

    return new RegExp(regexString, 'i').test(str);
  } catch (e) {
    console.log('[Error]: Error in custom search', e);
  }
};

export const getCommission = ({
  amount = '0',
  feePercent,
}: {
  amount: string;
  feePercent: number | undefined;
}): number => {
  try {
    if (amount) {
      return Number.parseFloat(amount) * ((feePercent || 0) / 100);
    }
    return 0;
  } catch (e) {
    console.log('Error with getting commission', e);
    return 0;
  }
};

export const getAmount = (amount: string) => {
  try {
    return Number.parseFloat(amount).toString();
  } catch (e) {
    console.log('Error with getting amount', e);
  }
};

export const getMaxAmount = ({
  balance,
  feePercent,
  maxAmount,
}: {
  balance: string | number;
  feePercent: number | undefined;
  maxAmount: string | number;
}): string => {
  try {
    const commission = Number.parseFloat(balance) * ((feePercent || 0) / 100);

    const balanceWithCommission = commission + Number.parseFloat(balance);
    const maxAmountWithCommission = commission + Number.parseFloat(maxAmount);

    if (Number.parseFloat(balance) >= maxAmountWithCommission) {
      return maxAmount.toString();
    } else if (Number.parseFloat(maxAmount) >= balanceWithCommission) {
      return balance.toString();
    }

    return '0';
  } catch (e) {
    console.log('[Error]: Get max amount');
    return '0';
  }
};

export {scaledSize};
