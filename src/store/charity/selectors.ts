import {createSelector} from 'reselect';
import {IStore} from '@store/types';
import {MONEY_COLLECTION_IDS, MONEY_COLLECTION_STATUS} from '@constants/index';
import i18next from 'i18next';

export const selectCharityStore = (store: IStore) => store.charity;

export const selectCurrentFund = createSelector(
  selectCharityStore,
  store => store.currentFund,
);

export const selectUserProposal = createSelector(
  selectCharityStore,
  store => store.userProposal,
);

export const selectTransactionInfo = createSelector(
  selectCharityStore,
  store => store.transactionInfo,
);

export const selectActiveFunds = createSelector(selectCharityStore, store => {
  return store.fundList.filter(fund => fund?.status === 1);
});

export const selectCompletedFunds = createSelector(selectCharityStore, store =>
  store.fundList.filter(fund => fund.status === 2),
);

export const selectFundTypes = createSelector(selectCharityStore, store => [
  {name: i18next.t('charity.all_directions')},
  ...store.fundTypes,
]);

export const selectFunds = createSelector(
  selectCharityStore,
  store => store.fundList,
);

export const selectActiveCollections = createSelector(
  selectCharityStore,
  store => {
    const data = store.activeCollections.reduce((result, obj) => {
      if (obj.type === MONEY_COLLECTION_IDS.PERSONAL) {
        result.personal = obj;
      } else if (obj.type === MONEY_COLLECTION_IDS.ZAKAT) {
        result.zakat = obj;
      } else if (obj.type === MONEY_COLLECTION_IDS.SADAKA) {
        result.sadaka = obj;
      }

      return result;
    }, {});

    return data; // {personal: {}, zakat: {}, sdaka: {}}
  },
);

export const selectCollections = createSelector(
  selectCharityStore,
  store => store.collectionList,
);

export const selectPersonals = createSelector(
  selectCharityStore,
  store => store.personals,
);

export const selectZakats = createSelector(
  selectCharityStore,
  store => store.zakats,
);

export const selectSadakas = createSelector(
  selectCharityStore,
  store => store.sadakas,
);

export const selectUserFunds = createSelector(
  selectCharityStore,
  store => store.userFunds,
);

export const selectUserProposals = createSelector(
  selectCharityStore,
  store => store.userPersonals,
);

export const selectUserActiveProposal = createSelector(
  selectCharityStore,
  store => {
    return store.userPersonals.find(
      item => item.status === MONEY_COLLECTION_STATUS.PENDING,
    );
  },
);

export const selectUserZakats = createSelector(
  selectCharityStore,
  store => store.userZakats,
);

export const selectUserActiveZakat = createSelector(
  selectCharityStore,
  store => {
    return store.userZakats.find(
      item => item.status === MONEY_COLLECTION_STATUS.PENDING,
    );
  },
);

export const selectUserSadakas = createSelector(
  selectCharityStore,
  store => store.userSadakas,
);

export const selectUserActiveSadaka = createSelector(
  selectCharityStore,
  store => {
    return store.userSadakas.find(
      item => item.status === MONEY_COLLECTION_STATUS.PENDING,
    );
  },
);

export const selectSelectedFundType = createSelector(
  selectCharityStore,
  store => store.selectedFundType,
);
