import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import RefreshLoader from '@components/other/RefreshLoader';
import ItemTransaction from '@components/items/ItemTransaction';
import Divider from '@components/Divider';
import EmptyList from '@components/containers/EmptyList';

import {getTransactions} from '@store/account';
import {selectLoading, selectTransactions} from '@store/account/selectors';
import {ITransaction} from '@store/account/types';

import styles from './styles';
import {TransactionsProps} from '@navigation/config/types';

export default function CurrencyTransaction({route}: TransactionsProps) {
  const {currencyId} = route.params;
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const transactions = useSelector(selectTransactions);

  const success = EStyleSheet.value('$green');
  const alert = EStyleSheet.value('$yellow');
  const error = EStyleSheet.value('$red');

  useEffect(() => {
    dispatch(getTransactions({currencyId}));
  }, [currencyId]);

  const onRefresh = () => {
    dispatch(getTransactions({currencyId}));
  };

  const onLoadMore = () => {
    dispatch(getTransactions({currencyId}, true));
  };

  const renderTransaction = ({item}: {item: ITransaction}) => (
    <ItemTransaction
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
        keyExtractor={item => `${item.time}`}
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ListEmptyComponent={EmptyList}
        ItemSeparatorComponent={Divider}
      />
    </SafeContainer>
  );
}
