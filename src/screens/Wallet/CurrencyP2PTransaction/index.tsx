import React, {useEffect} from 'react';
import {FlatList, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import RefreshLoader from '@components/other/RefreshLoader';
import Divider from '@components/Divider';
import EmptyList from '@components/containers/EmptyList';
import ItemTransactionP2p from '@components/items/ItemTransactionP2p';

import {getTransactionsP2p} from '@store/account';
import {P2PTransactionsProps} from '@navigation/config/types';
import {selectLoading, selectTransactionsP2P} from '@store/account/selectors';

import styles from './styles';

import {IP2PTransaction} from '@store/account/types';

export default function CurrencyP2PTransaction({route}: P2PTransactionsProps) {
  const dispatch = useDispatch();
  const {currencyId} = route.params;
  const success = EStyleSheet.value('$green');
  const alert = EStyleSheet.value('$yellow');
  const error = EStyleSheet.value('$red');

  const loading = useSelector(selectLoading);
  const transactions = useSelector(selectTransactionsP2P);

  useEffect(() => {
    dispatch(
      getTransactionsP2p({
        currencyId,
      }),
    );
  }, [dispatch, currencyId]);

  const onLoadMore = () => {
    dispatch(getTransactionsP2p({currencyId}, true));
  };

  const onRefresh = () => {
    dispatch(getTransactionsP2p({currencyId}));
  };

  const renderTransaction = ({item}: {item: IP2PTransaction}) => (
    <ItemTransactionP2p
      {...item}
      successColor={success}
      alertColor={alert}
      errorColor={error}
    />
  );

  return (
    <SafeContainer>
      <FlatList
        refreshing={true}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={transactions}
        renderItem={renderTransaction}
        contentContainerStyle={styles.contentContainerStyle}
        ItemSeparatorComponent={Divider}
        keyExtractor={item => `${item.time}`}
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ListEmptyComponent={EmptyList}
      />
    </SafeContainer>
  );
}
