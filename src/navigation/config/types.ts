import {StackScreenProps} from '@react-navigation/stack';
import {WithdrawWallet} from '@store/account/types';

export type MainNavigation = {
  Refill: {currencyId: number} | any;
  Transfer: {currencyId: number};
  Notifications: any;
  VerificationProfile: any;
} & WithdrawalStack;

export type RefillScreenProps = StackScreenProps<MainNavigation, 'Refill'>;

export type AuthStackProps = {
  SignIn: any;
  SignUp: any;
  SUVerificationPhone: {
    phone: string;
    email: string;
  };
  SUVerificationEmail: {
    email: string;
  };

  RPResetPassword: any;
  RPVerification: {
    isPhoneSelected: boolean;
    value: string;
  };
  RPEnterPassword: {
    code: string;
    isPhoneSelected: boolean;
    value: string;
  };
};

export type SIProps = StackScreenProps<AuthStackProps, 'SignIn'>;
export type SUProps = StackScreenProps<AuthStackProps, 'SignUp'>;

export type SUVerificationPhoneProps = StackScreenProps<
  AuthStackProps,
  'SUVerificationPhone'
>;
export type SUVerificationEmailProps = StackScreenProps<
  AuthStackProps,
  'SUVerificationEmail'
>;

export type ResetPasswordProps = StackScreenProps<
  AuthStackProps,
  'RPResetPassword'
>;
export type ResetPasswordVerificationProps = StackScreenProps<
  AuthStackProps,
  'RPVerification'
>;

export type ChangePasswordProps = StackScreenProps<
  AuthStackProps,
  'RPEnterPassword'
>;

export type WalletStackProps = {
  Wallet: any;
  WalletCurrency: {
    currencyId: number;
    pairCode: string;
  };
} & MainNavigation;

// export type WalletProps = StackScreenProps<WalletStackProps, 'Wallet'>;
export type WalletCurrencyProps = StackScreenProps<
  WalletStackProps,
  'WalletCurrency'
>;

export type EcominingNavigation = {
  Ecomining: any;
  TransactionList: any;
} & MainNavigation;
export type EcominingProps = StackScreenProps<EcominingNavigation, 'Ecomining'>;
export type TransactionListProps = StackScreenProps<
  EcominingNavigation,
  'TransactionList'
>;

export type HistoryTabNavigation = {
  HistoryPutIn: {
    currencyId: number | undefined;
  };
  HistoryPutOut: {
    currencyId: number | undefined;
  };
};
export type HistoryPutInProps = StackScreenProps<
  HistoryTabNavigation,
  'HistoryPutIn'
>;
export type HistoryPutOutProps = StackScreenProps<
  HistoryTabNavigation,
  'HistoryPutOut'
>;

export type DashboardNavigation = {
  Dashboard: any;
  DashboardSearch: any;
  TradeView: any;
} & MainNavigation;
export type DashboardProps = StackScreenProps<DashboardNavigation, 'Dashboard'>;
export type DashboardSearchProps = StackScreenProps<
  DashboardNavigation,
  'DashboardSearch'
>;

export type SecurityNavigation = {
  Security: any;
  GAuthentication: any;
  GASetupApp: any;
  GAEnterCode: any;
  GASecureCodes: any;
  AccountActivities: any;
  Devices: any;
  ChangePassword: any;
  AccountDeactivation: any;
  AccountConnectPhone: any;
  PasswordSecurity: any;
  VerificationPhone: any;
};

export type ProfileNavigation = {
  AboutUs: any;
  TermsOfUse: any;
  TermsOfUseDetail: {
    title: string;
    slug: string;
    backAction: () => void;
  };
};

export type TermsOfUseDetailProps = StackScreenProps<
  ProfileNavigation,
  'TermsOfUseDetail'
>;

export type GTFANavigation = {
  GTFACode: any;
  GTFAEnterCode: {secret: string};
  GTFAOneTimeCodes: {
    reserve_codes: string[];
  };
};

export type GTFAEnterCodeProps = StackScreenProps<
  GTFANavigation,
  'GTFAEnterCode'
>;
export type GTFAOneTimeCodesProps = StackScreenProps<
  GTFANavigation,
  'GTFAOneTimeCodes'
>;

export type WithdrawalStack = {
  Withdrawal: {currencyId: number} | any;
  WithdrawalWallets: {
    currencyId: number;
  };
  WithdrawalWalletsOperations: {
    currencyId?: number;
    type: 'create' | 'update';
    item?: WithdrawWallet;
  };
  WithdrawalVerification: any;
  Scanner: any;
  History: HistoryTabNavigation;
  BankAccountAdd: {
    currencyId: string;
    walletId: number;
  };
};

export type BankAccountAddProps = StackScreenProps<
  WithdrawalStack,
  'BankAccountAdd'
>;

export type WithdrawalScreenProps = StackScreenProps<
  WithdrawalStack,
  'Withdrawal'
>;

export type WithdrawalWalletsProps = StackScreenProps<
  WithdrawalStack,
  'WithdrawalWallets'
>;
export type WithdrawalWalletsOperationsProps = StackScreenProps<
  WithdrawalStack,
  'WithdrawalWalletsOperations'
>;
export type WithdrawalVerificationProps = StackScreenProps<
  WithdrawalStack,
  'WithdrawalVerification'
>;

type WalletTransactions = {
  Transactions: {
    currencyId: number;
  };
  P2PTransactions: {
    currencyId: number;
  };
};

export type TransactionsProps = StackScreenProps<
  WalletTransactions,
  'Transactions'
>;
export type P2PTransactionsProps = StackScreenProps<
  WalletTransactions,
  'P2PTransactions'
>;

type VerificationNavigation = {
  VChooseDocuments: any;
  UploadDocuments: any;
  UploadVideo: any;
};

export type ChooseDocumentsProps = StackScreenProps<
  VerificationNavigation,
  'VChooseDocuments'
>;

export type UploadDocumentsProps = StackScreenProps<
  VerificationNavigation,
  'UploadDocuments'
>;
export type UploadDocumentsVideoProps = StackScreenProps<
  VerificationNavigation,
  'UploadVideo'
>;
