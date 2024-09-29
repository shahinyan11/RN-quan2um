export const SET_VALUE = '@account/set_value';

export interface IAccount {
  loading: boolean;
  history: IHistory;
  notifications: INotifications;
  withdrawalWallets: IWithdrawWallets;
  transactions: ITransactions;
  transactionsP2P: IP2PTransactions;
  questions: IQuestions;
  verification: VerificationCreateResponse;
  //Withdrawal
  wallet: IWithdrawalWalletCurrency;
}

export interface IQuestions {
  tickets: IQuestion[];
  links: Links;
  meta: Meta;
}

export interface IQuestion {
  id: number;
  category: Category;
  status: string;
  status_name: string;
  time: number;
  question: Question;
  answers: Answer[];
}

export interface Category {
  id: number;
  name: string;
}

export interface Question {
  id: number;
  ticket_id: number;
  comment: string;
  is_read: boolean;
  attach: any;
  time: number;
}

export interface Answer {
  id: number;
  ticket_id: number;
  comment: string;
  is_read: boolean;
  attach: any;
}

export interface ITransactions {
  data: ITransaction[];
  links: Links;
  meta: Meta;
}

export interface IP2PTransactions {
  data: IP2PTransaction[];
  links: Links;
  meta: Meta;
}

export interface IP2PTransaction {
  id: number;
  account_id: number;
  currency: string;
  amount: number;
  amount_face: string;
  status: number;
  status_name: string;
  time: number;
  comment: string;
  type: string;
  is_receive: boolean;
}

export interface ITransaction {
  currency: Currency;
  amount: number;
  amount_face: string;
  status: string;
  status_name: string;
  payment_system?: string;
  crypto_address: string;
  time: number;
  is_deposit: boolean;
}

export interface IDevice {
  name: string;
  ip: string;
  time: number;
  is_active: boolean;
}

export interface IWallet {
  total_btc: string;
  total_usd: number;
  available: string;
  used: string;
  currency: Currency;
}

export interface IWalletCurrencyDetail {
  currency: Currency;
  total: string;
  total_usd: number;
  available: string;
  available_usd: number;
  used: string;
  used_usd: number;
}

export interface IWalletCurrency {
  info: Info;
  currencies: Currency[];
}

export interface Info {
  total_balance: number;
  total_balance_face?: string;
  currency: string;
  assets: number;
}

export interface GraphDaum {
  price: number;
  time: number;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  slug: string;
  logo: string;
  logo_png: string;
  color_hex: string;
  color_hex2: string;
  is_fiat: boolean;
  decimals: number;
  last_price: string;
  last_price_face: string;
  change: any;
  volume: string;
  volume_face: string;
  balance: number;
  balance_face: string;
  balance_fiat: number;
  balance_fiat_face: string;
  graph_data: any;
  can_deposit?: boolean;
  can_withdrawal?: boolean;
  pair_code?: string;
}

export interface IWithdrawalWalletCurrency {
  currency: Currency;
  balance: string;
  balance_face: string;
  amount_min: string;
  amount_min_face: string;
  amount_max: string;
  amount_max_face: string;
  amount_daily_max: string;
  amount_daily_max_face: string;
  payment_systems: PaymentSystem[];
  is_fiat: boolean;
  crypto_params: CryptoParams;
  advice: Advice;
  fee_percent?: number;
}

export interface BankRequisite {
  id: number;
  iban: string;
  is_verified: boolean;
}

export interface CryptoParams {
  success: boolean;
  address: string;
  qr_code: string;
  error: any;
}

export interface Advice {
  header: string;
  content: string;
}

export interface IResponseData<T> {
  data: T;
  links?: Links;
  meta?: Meta;
}

export interface IHistory extends IResponseData<IHistoryItem[]> {}

export interface INotifications extends IResponseData<Notification[]> {}

export interface IWithdrawWallets extends IResponseData<WithdrawWallet[]> {}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: number;
  kind: 'success' | 'error' | 'info';
  is_read: boolean;
}

export interface WithdrawWallet {
  id: number;
  name: string;
  address: string;
  currency: string;
}

export interface IHistoryItem {
  id: number;
  currency: Currency;
  amount: number;
  amount_face: string;
  status: string;
  status_name: string;
  payment_system: string;
  crypto_address: any;
  time: number;
  comment: string;
  fee_face: string;
  cancel_comment?: string;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface IRefillWallet {
  currency: Currency;
  balance: string;
  balance_face: string;
  amount_min: string;
  amount_min_face: string;
  amount_max: string;
  amount_max_face: string;
  payment_systems: PaymentSystem[];
  is_fiat: boolean;
  markets: IMarket[];
  fee_percent: number;
  fee_value: number;
  crypto_params: CryptoParams;
  advice: Advice;
}

export type PaymentSystemSlug =
  | 'bank-transfer'
  | 'perfect-money'
  | 'payeer'
  | 'stripe'
  | 'piastrix';

export interface PaymentSystem {
  id: number;
  slug: PaymentSystemSlug;
  name: string;
  extra: Extra;
}

export interface Extra {
  requisites?: any[];
  faq?: any[];
  pub_key?: string;
}

export interface IMarket {
  id: number;
  pair: string;
  pair_format: string;
}

export interface Transfer {
  currencies: TransferCurrency[];
  info: Info;
}

export interface TransferCurrency {
  id: number;
  name: string;
  code: string;
  transfer_min: number;
  transfer_min_face: string;
  transfer_max: number;
  transfer_max_face: string;
  current_balance: number;
  current_balance_face: string;
  currency: Currency;
}

export interface Verification {
  documents: DocumentType[];
  status: Status;
  extensions: Extensions;
}

export interface DocumentType {
  id: number;
  code: string;
  name: string;
}

export interface Status {
  status: 'created' | 'process' | 'completed' | 'rejected';
  status_title: string;
  comment: string;
  documents: Document[];
  document_type_id: number;
  valid_labels: ValidLabel[];
}

export interface VerificationCreateResponse {
  application_id: number;
  status: Status;
  valid_labels: any[];
  is_dev_mode: boolean;
  recognition_enabled: boolean;
}

export interface Document {
  id: number;
  application_id: number;
  original_filename: string;
  name?: string;
  uri?: string;
  type?: string;
  extension: string;
  comment: any;
  is_video: boolean;
  is_selfie?: boolean;
}

export interface Extensions {
  image: string;
  video: string;
}

export interface StripeResponse {
  mode: string;
  processor_status: string;
  next_action?: NextAction;
  client_secret?: string;
  transaction_id?: string;
  cancel_url?: string;
  payment?: StripePaymentStatus;
}

export interface StripePaymentStatus {
  success: boolean;
  header: string;
  message: string;
  currency: string;
  deposit_amount: string;
  fee: string;
  total_amount: string;
}

export interface NextAction {
  type: string;
  use_stripe_sdk: UseStripeSdk;
}

export interface UseStripeSdk {
  type: string;
  merchant: string;
  three_d_secure_2_source: string;
  directory_server_name: string;
  server_transaction_id: string;
  three_ds_method_url: string;
  three_ds_optimizations: string;
  directory_server_encryption: DirectoryServerEncryption;
  one_click_authn: any;
}

export interface DirectoryServerEncryption {
  directory_server_id: string;
  algorithm: string;
  certificate: string;
  root_certificate_authorities: string[];
}

export interface ValidLabel {
  confidence: number;
  label: string;
}
