export const SET_VALUE = '@app/set_value';

export interface IApp {
  isMessageVisible: boolean;
  message: IAlertData;
  language: ILanguage;
  currency: ICurrency;
  languages: ILanguage[];
  isSecure: boolean;
  appPassword: string;
  unlockDate: number;
  isSetSecurePass: boolean;
  countries: ICountries[];
  baseUrl: string;
  tfaSkipped: boolean;
}

export interface ICountries {
  id: number;
  iso: string;
  iso2: string;
  name: string;
  dialCode: string;
}

export interface ICurrency {
  id: number;
  name: string;
  title: string;
}
export interface ILanguage {
  id: number;
  locale: string;
  title: string;
  is_default: boolean;
}

interface IAlertData {
  title?: string;
  message: string;
  type?: 'error' | 'success' | 'alert';
}

export interface IAlert {
  data: IAlertData;
}
