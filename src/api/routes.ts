// Common
export const COUNTRIES = '/countries';

//MARKET
export const GET_MARKET_PAIRS = '/market/losers-gainers';
export const MARKET = '/market';

//ACCOUNT

//ACCOUNT PUSH
export const ACCOUNT_CHECK_FCM_TOKEN = '/account/push/exists';
export const ACCOUNT_SUBSCRIBE_FCM = '/account/push/subscribe';
export const ACCOUNT_UNSUBSCRIBE_FCM = '/account/push/unsubscribe';

export const ACCOUNT_DEVICES = '/account/devices';
export const ACCOUNT_DEACTIVATE = '/account/deactivate';
export const ACCOUNT_DEACTIVATE_EMAIL = '/account/deactivate-via-email';
export const ACCOUNT_WALLET = '/account/dashboard-mobile';
export const ACCOUNT_WALLET_CURRENCIES = '/account/assets';
export const ACCOUNT_WALLET_TRANSACTIONS = '/account/assets/transaction';

//ACCOUNT VERIFICATION
export const ACCOUNT_VERIFICATION_SETTINGS = '/account/verification/settings';
export const ACCOUNT_VERIFICATION_DOCUMENT_CREATE =
  '/account/verification/create';
export const ACCOUNT_VERIFICATION_DOCUMENT_UPLOAD_PHOTO =
  '/account/verification/upload-document';
export const ACCOUNT_VERIFICATION_DOCUMENT_UPLOAD_VIDEO =
  '/account/verification/upload-video';
export const ACCOUNT_VERIFICATION_DOCUMENT_DELETE =
  '/account/verification/delete-file';
export const ACCOUNT_VERIFICATION_SEND = '/account/verification/send';

export const ACCOUNT_BANK_SCORE_VERIFICATION =
  '/account/bank-requisites/validate';
export const ACCOUNT_BANK_SCORE_CREATE = '/account/bank-requisites/create';
export const ACCOUNT_BANK_SCORE_DELETE = '/account/bank-requisites/delete';

export const ACCOUNT_DEPOSIT_WALLETS = '/account/deposit';
export const ACCOUNT_DEPOSIT_LIST = '/account/deposit/list';
export const ACCOUNT_WITHDRAWAL_LIST = '/account/withdrawal/list';
export const ACCOUNT_DEPOSIT_CREATE = '/account/deposit/create';
export const ACCOUNT_NOTIFICATIONS_UNREAD = '/account/notices-unread';
export const ACCOUNT_SUPPORT_LIST = '/account/support/tickets';
export const ACCOUNT_SUPPORT_CATEGORIES_LIST = '/account/support/categories';
export const ACCOUNT_SUPPORT_CREATE_QUESTION = '/account/support/create';

export const ACCOUNT_WITHDRAW_WALLETS = '/account/withdrawal';
export const ACCOUNT_WALLETS_FOR_WITHDRAWALS = '/account/withdrawal-wallets';
export const ACCOUNT_WITHDRAW_LIST = '/account/withdrawal/list';
export const ACCOUNT_WITHDRAW_CREATE = '/account/withdrawal/create';
export const ACCOUNT_WITHDRAW_RESEND_CODE = '/account/withdrawal/resend';
export const ACCOUNT_WITHDRAW_CONFIRM = '/account/withdrawal/confirm';
export const ACCOUNT_TRANSFER = '/account/transfer';
export const ACCOUNT_TRANSFER_CREATE = '/account/transfer/create';
export const ACCOUNT_TRANSFERS_P2p = '/account/transfer/list';

//UPDATE EMAIL
export const ACCOUNT_UPDATE_EMAIL = '/account/update-email';
export const ACCOUNT_UPDATE_EMAIL_VERIFICATION = '/account/update-email-verify';

//UPDATE PHONE
export const ACCOUNT_UPDATE_PHONE = '/account/phone/create';

export const ACCOUNT_NOTIFICATIONS = '/account/notices';
export const ACCOUNT_NOTIFICATIONS_READ = '/account/notice/read';
export const ACCOUNT_NOTIFICATIONS_DELETE = '/account/notice/delete';
export const ACCOUNT_TFA = 'account/security/tfa-code';
export const ACCOUNT_TFA_ENABLE = 'account/security/tfa-enable';
export const ACCOUNT_TFA_DISABLE = 'account/security/tfa-disable';

//USER
export const USER_LOGIN = '/user/login';
export const USER_REGISTRATION = '/user/register';
export const USER_SOCIAL_LOGIN = '/user/social-login';
export const USER_SEND_CODE = '/user/send-code';
export const USER_VERIFICATION_CODE = '/user/verify-register-code';
export const USER_INFO = '/user/info';

export const USER_REFRESH_TOKEN = '/user/refresh-token';
export const USER_BALANCE = '/user/balance';

//RECOVER_PASSWORD
export const USER_RECOVERY_PASSWORD = '/user/recover-password';
export const USER_VERIFICATION_RESEND_CODE = '/user/recover-password-resend';
export const USER_VERIFICATION_CHECK_CODE = '/user/reset-password-check-code';
export const USER_RESET_PASSWORD_CODE = '/user/reset-password-code';

export const PAGES_REGISTERED_LIST = '/pages/register-list';
export const PAGES_REGISTERED_LIST_DETAIL = '/pages';
export const GET_PAGES_HOMEPAGE = '/pages/slides';

//FAQ
export const FAQ_ALL = '/faq/all';
export const FAQ_DETAIL = '/faq';
export const FAQ_QUESTION = '/faq/question';

export const USER_CHANGE_PASSWORD = '/user/change-password';

//SETTINGS
export const LANGUAGES = '/languages';

//TRADEVIEW
export const TRADEVIEW_ORDERS = '/tradeview/orders/open';
export const TRADEVIEW_ORDERS_CANCEL = '/account/orders/cancel';
export const TRADEVIEW_ORDERS_HISTORY = '/tradeview/orders/history';

export const TRADEVIEW_MARKET = '/tradeview/market';
export const TRADEVIEW_MARKETS = '/tradeview/markets';
export const TRADEVIEW_CHART = '/tradeview/chart';
export const TRADEVIEW_CREATE_ORDER = '/market/order';

// TRADEVIEW CHAT
export const CHAT = '/chat';
export const CHAT_MESSAGE = '/chat/message';

//ECOMINING MASTER NODE
export const ACCOUNT_MASTER_NODE = '/account/master-nodes';
export const ACCOUNT_MASTER_NODES_WITH_REWARD =
  '/account/master-nodes/with-multiple-reward';
export const ACCOUNT_MASTER_NODE_INVEST = '/account/master-nodes/invest';
export const ACCOUNT_MASTER_NODE_WITHDRAWAL =
  '/account/master-nodes/withdrawal';
export const ACCOUNT_MASTER_NODE_HISTORY = '/account/master-nodes/history';
export const ACCOUNT_MASTER_NODE_HISTORY_FILTERS =
  '/account/master-nodes/history-filters';

//Referral
export const ACCOUNT_REFERRAL_SETTINGS = '/account/referrals/settings';
export const ACCOUNT_REFERRALS_ACCRUAL_HISTORY =
  '/account/referrals/v2/accrual-history';
export const ACCOUNT_REFERRALS_INVITATION = '/account/referrals/v2/invitations';
export const ACCOUNT_REFERRALS_REWARD = '/account/referrals/v2/rewards';

export const ACCOUNT_EXCHANGE_LIST = '/account/exchange/list';
export const ACCOUNT_EXCHANGE_STATUS = '/account/exchange/status';
export const ACCOUNT_EXCHANGE_CREATE = '/account/exchange/create';

//bonus account
export const BONUS_ACCOUNT = '/account/bonus-program/tools-info';

//Charity Foundation
export const CHARITY_FOUNDATIONS = '/charity-foundations';
export const CHARITY_FOUNDATIONS_ALL = '/charity-foundations/all';
export const CHARITY_FOUNDATIONS_MY = '/charity-foundations/my';
export const CHARITY_FOUNDATIONS_CREATE = '/charity-foundations/create';
export const CHARITY_FOUNDATIONS_DONATE = '/charity-foundations/donate';
export const CHARITY_FOUNDATIONS_LOGS = '/charity-foundations/logs';
export const CHARITY_FOUNDATIONS_TYPES = '/charity-foundations/types';

//Money Collection
export const MONEY_COLLECTION_GET = '/money-collection/get';
export const MONEY_COLLECTION_FINISHED = '/money-collection/finished';
export const MONEY_COLLECTION_DONATE = '/money-collection/donate';
export const CREATE_PROPOSAL = '/money-collection/create-proposal';
export const MONEY_COLLECTION_TEST_INIT = '/money-collection/muslim-test/init';
export const MONEY_COLLECTION_TEST_STATUS =
  '/money-collection/muslim-test/status';
export const MONEY_COLLECTION_TEST_QUESTION =
  '/money-collection/muslim-test/current-question';
export const MONEY_COLLECTION_TEST_ANSWER =
  '/money-collection/muslim-test/answer-question';
export const MONEY_COLLECTION_DONATE_LOGS = '/money-collection/donate-logs';
export const MONEY_COLLECTION_WITHDRAWAL_LOGS =
  '/money-collection/withdrawal-logs';
export const MONEY_COLLECTION_USER_PROPOSALS =
  '/money-collection/user-proposals';
