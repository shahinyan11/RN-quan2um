import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import RefreshLoader from '@components/other/RefreshLoader';
import Divider from '@components/Divider';
import ItemHistory from '@components/items/ItemHistory';
import EmptyList from '@components/containers/EmptyList';

import {IHistoryItem} from '@store/account/types';
import {selectHistory, selectLoading} from '@store/account/selectors';
import {getHistoryPutIn} from '@store/account';

import {stylesGlobal} from '@constants/globalStyles';
import {HistoryPutInProps} from '@navigation/config/types';

export default function HistoryPutIn({route, navigation}: HistoryPutInProps) {
  const {
    params = {
      currencyId: undefined,
    },
  } = route;

  const history = useSelector(selectHistory);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const onRefreshHistory = () => {
    dispatch(getHistoryPutIn({currency_id: params.currencyId}));
  };

  const onLoadMore = () => {
    dispatch(getHistoryPutIn({currency_id: params.currencyId}, true));
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(getHistoryPutIn({currency_id: params.currencyId}));
    });

    return focusListener;
  }, [params.currencyId, dispatch, navigation]);

  const renderItemHistory = ({item}: {item: IHistoryItem}) => (
    <ItemHistory
      currencyCode={item.currency.code}
      paymentSystem={item.payment_system}
      status={item.status}
      statusName={item.status_name}
      amount={item.amount_face}
      date={item.time}
      address={item.crypto_address}
      commission={item.fee_face}
      cancelComment={item?.cancel_comment}
      is_fiat={item.currency.is_fiat}
    />
  );

  return (
    <SafeContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={history}
        renderItem={renderItemHistory}
        ItemSeparatorComponent={Divider}
        refreshing={loading}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefreshHistory} />
        }
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        contentContainerStyle={stylesGlobal.contentContainerStyle}
        keyExtractor={item => item.id.toString()}
        ListEmptyComponent={EmptyList}
      />
    </SafeContainer>
  );
}
