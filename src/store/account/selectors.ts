import {IStore} from '@store/types';
import {createSelector} from 'reselect';

const selectAccountStore = (store: IStore) => store.account;

export const selectHistory = createSelector(
  selectAccountStore,
  accountStore => accountStore.history.data || [],
);

export const selectHistoryOut = createSelector(
  selectAccountStore,
  accountStore => accountStore.historyOut.data || [],
);

export const selectLoading = createSelector(
  selectAccountStore,
  accountStore => accountStore.loading,
);

export const selectNotifications = createSelector(
  selectAccountStore,
  accountStore => accountStore.notifications.data || [],
);

export const selectWithdrawalWallets = createSelector(
  selectAccountStore,
  accountStore => accountStore.withdrawalWallets.data || [],
);

export const selectTransactions = createSelector(
  selectAccountStore,
  accountStore => accountStore.transactions.data,
);

export const selectTransactionsP2P = createSelector(
  selectAccountStore,
  accountStore => accountStore.transactionsP2P.data,
);

export const selectQuestions = createSelector(
  selectAccountStore,
  accountStore => accountStore.questions.tickets || [],
);

export const selectWallet = createSelector(
  selectAccountStore,
  accountStore => accountStore.wallet,
);

export const selectVerificationApplicationId = createSelector(
  selectAccountStore,
  accountStore => accountStore.verification.application_id,
);

export const selectVerificationDocuments = createSelector(
  selectAccountStore,
  accountStore =>
    accountStore.verification.status.documents.filter(
      document => !document.is_video,
    ),
);

export const selectVerificationPhoto = createSelector(
  selectAccountStore,
  accountStore =>
    accountStore.verification.status.documents.filter(
      document => document.is_video,
    ),
);

export const selectAccountTransfer = createSelector(
  selectAccountStore,
  accountStore => accountStore.transfer,
);

export const selectTransferForm = createSelector(
  selectAccountStore,
  accountStore => accountStore.transferForm,
);

export const selectFees = createSelector(
  selectAccountStore,
  accountStore => accountStore.fees,
);

export const selectAssets = createSelector(
  selectAccountStore,
  accountStore => accountStore.assets,
);

export const selectDashboard = createSelector(
  selectAccountStore,
  accountStore => accountStore.dashboard,
);

export const selectWithdrawForm = createSelector(
  selectAccountStore,
  accountStore => accountStore.withdrawForm,
);

export const selectNotificationSettings = createSelector(
  selectAccountStore,
  accountStore => accountStore.fcmSubscribe,
);

export const selectVerification = createSelector(
  selectAccountStore,
  accountStore => accountStore.verification,
);
