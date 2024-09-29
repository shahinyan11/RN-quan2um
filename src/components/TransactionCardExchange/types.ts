export type Props = {
  item: Item;
};

type Item = {
  amount: number;
  amount_face: string;
  crypto_address: string;
  currency: Currency;
  fee: number;
  fee_face: string;
  id: number;
  network: string;
  payment_system: string;
  status: string;
  status_name: string;
  time: number;
  tx_url: string;
};

export interface Currency {
  can_deposit: boolean;
  can_withdrawal: boolean;
  code: string;
  color_hex: string;
  color_hex2: string;
  decimals: number;
  id: number;
  is_fiat: string;
  logo: string;
  logo_alt: string;
  logo_png: string;
  name: string;
  slug: string;
}
