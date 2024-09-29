import {IStore} from '@store/types';
import {createSelector} from 'reselect';
import {IAuth} from './types';

const selectAuthStore = (store: IStore): IAuth => store.auth;

export const selectIsAuth = createSelector(
  [selectAuthStore],
  authStore => authStore.isAuth,
);

export const selectUser = createSelector(
  [selectAuthStore],
  authStore => authStore.user || {},
);

export const selectLoading = createSelector(
  [selectAuthStore],
  authStore => authStore.loading,
);

export const selectTFAEnabled = createSelector(
  [selectAuthStore],
  authStore => authStore.user.tfa_enabled === 1,
);

export const selectIsEmailTemp = createSelector(
  [selectAuthStore],
  authStore => authStore.user.has_temp_mail,
);

export const selectHasPhoneNumber = createSelector(
  [selectAuthStore],
  authStore => Boolean(authStore.user.phone),
);

export const selectIsSocialAccount = createSelector(
  [selectAuthStore],
  authStore => authStore.user.is_social,
);

export const selectSocketToken = createSelector(
  selectAuthStore,
  authStore => authStore.user?.ws_access_token,
);

export const selectSocialRegister = createSelector(
  selectAuthStore,
  authStore => authStore.socialRegister,
);
export const selectUserVerificationStatus = createSelector(
  [selectAuthStore],
  authStore => authStore.user?.verification?.status,
);

export const selectUserBalance = createSelector(
  [selectAuthStore],
  authStore => authStore.userBalance,
);
