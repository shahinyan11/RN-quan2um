export const SET_VALUE = '@auth/set_value';
export const SET_USER = '@auth/set_user';
export const SET_USER_BALANCE = '@auth/set_user_balance';
export const LOGOUT = '@auth/logout';

export interface IAuth {
  isAuth: boolean;
  user: IUser | null;
  loading: boolean;
  socialRegister: any;
  isDowntime: boolean;
  userBalance: UserBalance;
}

export interface IUser {
  id: number;
  name: any;
  lastname: any;
  email: string;
  email_hidden: string;
  phone: string;
  account_id: number;
  country_id: number;
  tfa_enabled: number;
  timezone: string;
  is_verified: boolean;
  ws_access_token: string;
  trade_volume: string;
  account_type: number;
  level: number;
  level_name: string;
  verification: Verification;
  is_social: boolean;
  is_community_ban: boolean;
  has_temp_mail: boolean;
  required_fields: any;
  access_token: string;
  token_expires_at: number;
  refresh_token: string;
  is_sent_business_req: boolean;
}

export interface Verification {
  status: string;
  name: string;
}

export interface UserBalance {
  currency_id?: number;
  amount?: string;
  amount_face?: string;
  amount_fiat?: number;
  amount_fiat_face?: string;
  fiat_code?: string;
}
