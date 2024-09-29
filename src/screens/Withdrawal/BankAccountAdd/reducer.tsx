type ActionType = '@bank/set_value';

interface IAction {
  type: ActionType;
  payload: {
    field: keyof IBankAccount;
    value: string;
  };
}

export interface IBankAccount {
  currency_id: string;
  bank_name: string;
  address: string;
  country?: string;
  city?: string;
  pos_code: string;
  iban: string;
  swift: string;
  correspondent_bank: string;
}

export const initState: IBankAccount = {
  currency_id: '',
  bank_name: '',
  address: '',
  country: '',
  city: '',
  pos_code: '',
  iban: '',
  swift: '',
  correspondent_bank: '',
};

export const reducer = (state: IBankAccount, action: IAction): IBankAccount => {
  switch (action.type) {
    case '@bank/set_value': {
      const {field, value} = action.payload;
      return {
        ...state,
        [field]: value,
      };
    }
    default:
      throw new Error();
  }
};
