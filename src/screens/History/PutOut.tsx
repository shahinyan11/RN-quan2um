import React, {useEffect} from 'react';

import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import RefreshLoader from '@components/other/RefreshLoader';
import Divider from '@components/Divider';
import ItemHistory from '@components/items/ItemHistory';
import EmptyList from '@components/containers/EmptyList';

import {IHistoryItem} from '@store/account/types';
import {selectHistoryOut, selectLoading} from '@store/account/selectors';
import {getHistoryPutOut} from '@store/account';

import {stylesGlobal} from '@constants/globalStyles';
import {HistoryPutOutProps} from '@navigation/config/types';

export default function HistoryPutOut({route, navigation}: HistoryPutOutProps) {
  const {
    params = {
      currencyId: undefined,
    },
  } = route;

  const historyOut = useSelector(selectHistoryOut);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const onRefreshHistory = () => {
    dispatch(getHistoryPutOut({currency_id: params.currencyId}));
  };

  const onLoadMore = () => {
    dispatch(getHistoryPutOut({currency_id: params.currencyId}, true));
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(getHistoryPutOut({currency_id: params.currencyId}));
    });

    return focusListener;
  }, [dispatch, params.currencyId, navigation]);

  const renderItemHistory = ({item}: {item: IHistoryItem}) => (
    <ItemHistory
      currencyCode={item.currency.code}
      paymentSystem={item.payment_system}
      status={item.status}
      statusName={item.status_name}
      amount={item.amount_face}
      date={item.time}
      address={item.comment}
      commission={item.fee_face}
      cancelComment={item.cancel_comment}
      is_fiat={item.currency.is_fiat}
    />
  );

  return (
    <SafeContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={historyOut}
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
