export const checkPasswordStrength = (password: string) => {
  const strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
  );
  const mediumPassword = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
  );
  if (strongPassword.test(password)) {
    return 10;
  } else if (mediumPassword.test(password)) {
    return 5;
  } else {
    return 0;
  }
};

export const emailValid = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const passwordValid = (password: string): boolean => {
  return password.length >= 8;
};

export const phoneValid = ({
  code,
  phone,
}: {
  code: string;
  phone: string;
}): boolean => {
  try {
    return Boolean(code) && phone.length > 8;
  } catch (e) {
    console.log('Error validation');
  }
};

//FIXME: Validate number
export const validateNumber = (value: string) => {
  try {
    const regexIsNumber = new RegExp(
      /(^(\d{1,15})([.|,])(\d{1,15})?$)|(^(\d{1,15})$)|(^$)/,
    );

    return regexIsNumber.test(value);
  } catch (e) {
    console.log('Error with validation number', e);
  }
};

export const validateAmount = ({
  amount,
  maxAmount,
  minAmount,
  balance,
}: {
  amount: string;
  maxAmount: number;
  minAmount: number;
  balance: number;
}) => {
  try {
    const tempAmount = Number.parseFloat(amount);

    return (
      tempAmount <= balance &&
      (!maxAmount || tempAmount <= maxAmount) &&
      tempAmount >= minAmount &&
      tempAmount > 0
    );
  } catch (e) {
    console.error('Error validation amount');
    return false;
  }
};
