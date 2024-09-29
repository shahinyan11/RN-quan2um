import {IStore} from '@store/types';
import {createSelector} from 'reselect';

export const selectAppStore = (store: IStore) => store.app;

export const selectLanguage = createSelector(
  selectAppStore,
  appStore => appStore.language,
);

export const selectLanguages = createSelector(
  selectAppStore,
  appStore => appStore.languages,
);

export const selectCurrency = createSelector(
  selectAppStore,
  appStore => appStore.currency,
);

export const selectMessage = createSelector(
  selectAppStore,
  appStore => appStore.message,
);

export const selectMessageVisible = createSelector(
  selectAppStore,
  appStore => appStore.isMessageVisible,
);

export const selectIsSecure = createSelector(
  selectAppStore,
  appStore => appStore.isSecure,
);

export const selectIsAppPasswordSet = createSelector(selectAppStore, appStore =>
  Boolean(appStore.appPassword),
);

export const selectAppPassword = createSelector(
  selectAppStore,
  appStore => appStore.appPassword,
);

export const selectUnlockDate = createSelector(
  selectAppStore,
  appStore => appStore.unlockDate,
);

export const selectSetSecurePass = createSelector(
  selectAppStore,
  appStore => appStore.isSetSecurePass,
);

export const selectTfaSkipped = createSelector(
  selectAppStore,
  appStore => appStore.tfaSkipped,
);

export const selectBaseUrl = createSelector(
  selectAppStore,
  appStore => appStore.baseUrl,
);
