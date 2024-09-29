import {IMasterNodes} from './types';
import {createSelector} from 'reselect';
import {IStore} from '@store/types';

const selectEcominingStore = (store: IStore): IMasterNodes => store.ecomining;

export const selectMasterNodeData = createSelector(
  [selectEcominingStore],
  storeMasterNode => storeMasterNode.node,
);

export const selectLoading = createSelector(
  selectEcominingStore,
  store => store.loading,
);

export const selectLoadingSend = createSelector(
  selectEcominingStore,
  store => store.loadingSend,
);

export const selectMasterNodeHistory = createSelector(
  selectEcominingStore,
  store => store.master_nodes_history,
);

export const selectMasterNodeHistoryFiltered = createSelector(
  selectEcominingStore,
  store => store.master_nodes_history_filtered,
);

export const selectKinds = createSelector(
  selectEcominingStore,
  store => store.master_nodes_history_filtered.kinds,
);
