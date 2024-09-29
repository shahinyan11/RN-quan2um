import i18n from 'i18next';
import i18next from 'i18next';

type CashType = 'all' | 'crypto' | 'fiat';

type Pairs = 'losers' | 'gainers';

export type Order = 'all' | 'buy' | 'sell';

export type Bet = 'limit' | 'market';

export type TYPE_OF_ORDER = 'buy' | 'sell';

export type IFilterType<T> = {
  id: number;
  title: string;
  value: T;
};

export type IFilterCash = IFilterType<CashType>;
export type IFilterPairs = IFilterType<Pairs>;
export type IFilterOrders = IFilterType<Order>;
export type IFilterBet = IFilterType<Bet>;

export const getFiltersTypes = (): IFilterCash[] => [
  {id: 0, title: i18n.t('common.all'), value: 'all'},
  {id: 1, title: i18n.t('common.m_cryptocurrency'), value: 'crypto'},
  {id: 2, title: i18n.t('common.m_fiat'), value: 'fiat'},
];

export const getSelectorsList = (): IFilterPairs[] => [
  {id: 0, title: i18n.t('home.m_losing_value'), value: 'losers'},
  {id: 1, title: i18n.t('home.m_show_growth'), value: 'gainers'},
];

export const getOrdersList = (): IFilterOrders[] => [
  {id: 0, title: i18n.t('common.all'), value: 'all'},
  {id: 1, title: i18n.t('common.m_buy_orders'), value: 'buy'},
  {id: 2, title: i18n.t('common.m_sell_orders'), value: 'sell'},
];

export const getTypesOfBet = (): IFilterBet[] => [
  {id: 0, title: i18n.t('common.market'), value: 'market'},
  {id: 1, title: i18n.t('common.limit'), value: 'limit'},
];

export const getSelectorsQuantity = () => [
  {id: 0, title: i18n.t('common.quantity'), value: 'quantity'},
  {id: 1, title: i18n.t('common.total'), value: 'total'},
];

export const getIntervals = () => [
  {id: 0, title: '15 minute', value: '15m'},
  {id: 1, title: '30 minutes', value: '30m'},
  {id: 2, title: '1 hour', value: '1h'},
  {id: 3, title: '2 hours', value: '2h'},
  {id: 4, title: '4 hours', value: '4h'},
  {id: 5, title: '12 hours', value: '12h'},
  {id: 6, title: '1 day', value: '1D'},
  {id: 7, title: '1 week', value: '1W'},
  {id: 8, title: '1 month', value: '1m'},
  {id: 9, title: '5 months', value: '5m'},
];

export const EXCHANGE_TYPES = {
  card: {
    label: 'input.label_card_number',
    placeholder: '0000   0000   0000   0000',
    mask: '9999   9999   9999   9999',
  },

  phone: {
    label: 'common.phone_number',
    placeholder: '+7   000   000   00   00',
    mask: '+9   999   999   99   99',
  },
  iban: {
    label: 'exchange.enter_your_account_iban',
    placeholder: '0000  0000  0000  0000  0000  00',
    mask: 'AA99  SSSS  9999  9999  9999  99',
  },
  email: {
    label: 'Электронная почта',
    placeholder: 'quan2um@gmail.com',
    splitArr: [],
    gap: 0,
    mask: undefined,
  },
};

export const MASTER_NODE_HISTORY_TAB = {
  1: i18next.t('assets.history_deposit'),
  2: i18next.t('assets.history_reward'),
  3: i18next.t('assets.history_withdraw'),
};

export const START_MINING_TABS = [
  {id: 1, name: i18next.t('invest_mn.main_balance')},
  {id: 2, name: i18next.t('common.bonus_account')},
];

export const FUNDATION_TYPES = [
  i18next.t('charity.all_directions'),
  //   i18next.t('charity.helping_animals'),
  //   i18next.t('charity.helping_children'),
  //   i18next.t('charity.helping_pensioners'),
  //   i18next.t('charity.other'),
];

export const MONEY_COLLECTION_IDS = {
  PERSONAL: 1,
  ZAKAT: 2,
  SADAKA: 3,
};

export const MONEY_COLLECTION_STATUS = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
  CANCELLED: 3,
};

export const MONEY_COLLECTION_STATUS_TAB = [
  {
    name: i18next.t('charity.all_proposals'),
  },
  {
    id: MONEY_COLLECTION_STATUS.PENDING,
    name: i18next.t('charity.status_pending'),
  },
  {
    id: MONEY_COLLECTION_STATUS.ACCEPTED,
    name: i18next.t('charity.status_approved'),
  },
  {
    id: MONEY_COLLECTION_STATUS.REJECTED,
    name: i18next.t('charity.status_rejected'),
  },
  {
    id: MONEY_COLLECTION_STATUS.CANCELLED,
    name: i18next.t('charity.status_canceled'),
  },
];

export const TEXTS_BY_MC_STATUS = {
  [MONEY_COLLECTION_STATUS.PENDING]: {
    BUTTON_TEXT: i18next.t('charity.revoke_request'),
    STATUS_TEXT: i18next.t('charity.application_in_review'),
    COLOR: '#7F65FF',
  },
  [MONEY_COLLECTION_STATUS.ACCEPTED]: {
    BUTTON_TEXT: i18next.t('charity.allocation_report'),
    STATUS_TEXT: i18next.t('charity.application_approved'),
    COLOR: '#7EC447',
  },
  [MONEY_COLLECTION_STATUS.REJECTED]: {
    BUTTON_TEXT: i18next.t('charity.rejection_reason'),
    STATUS_TEXT: i18next.t('charity.application_rejected'),
    COLOR: '#E42D2D',
  },
  [MONEY_COLLECTION_STATUS.CANCELLED]: {
    BUTTON_TEXT: i18next.t('charity.application_canceled'),
    STATUS_TEXT: i18next.t('charity.application_canceled'),
  },
};

export const MUSLIM_TEST_STATUS = {
  STATUS_PENDING: 0,
  STATUS_APPLIED_FOR_PERSONAL_HELP: 1,
  STATUS_APPLIED_FOR_MUSLIM: 2,
  STATUS_PASSED: 3,
  STATUS_FAILED: 4,
};

export const EXCHANGE_STEPS = [
  {step: 1, label: i18next.t('exchange.enter_data')},
  {step: 2, label: i18next.t('exchange.check_accuracy')},
  {step: 3, label: i18next.t('exchange.wait_for_exchange')},
  {step: 4, label: i18next.t('order_status.completed')},
];
