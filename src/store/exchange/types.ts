export type Action = {
  type: string;
  payload: any | undefined;
};

export type InitState = {
  list: any[];
  transactions: any[];
  selectedMethod: SelectedMethod;
  currentExchange: CurrentExchange;
};

export interface SelectedMethod {
  method: string;
  title: string;
  from: string;
  from_short: string;
  from_long: string;
  to: string;
  to_short: string;
  to_long: string;
  rate: number;
  min: number;
  max: number;
  deposit_fee: number;
  withdraw_fee: number;
  cryptoaddress: string;
  cryptonet: string;
  slug: string;
  bank_logo: string;
  type: string;
  currencyTo: Currency;
  currencyFrom: Currency;
}

export interface CurrentExchange {
  address?: string;
  amount: string;
  expire: number;
  fee?: number;
  link: string;
  status: string;
  text: string;
  from_card?: string;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  slug: string;
  logo: string;
  logo_png: string;
  logo_slug: string;
  logo_alt: string;
  color_hex: string;
  color_hex2: string;
  is_fiat: boolean;
  decimals: number;
  can_deposit: boolean;
  can_withdrawal: boolean;
}
