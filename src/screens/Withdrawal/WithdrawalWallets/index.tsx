import React, {useCallback} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import ItemWallet from '@components/items/ItemWallet';
import ButtonGradient from '@components/buttons/ButtonGradient';
import EmptyList from '@components/containers/EmptyList';
import RefreshLoader from '@components/other/RefreshLoader';

import {selectLoading, selectWithdrawalWallets} from '@store/account/selectors';
import {WithdrawalWalletsProps} from '@navigation/config/types';
import {WithdrawWallet} from '@store/account/types';
import {
  getWithdrawalWallets,
  setWithdrawForm,
  clearWalletAddress,
} from '@store/account';

import {useFocusEffect} from '@react-navigation/native';

export default function WithdrawalWallets({
  navigation,
  route,
}: WithdrawalWalletsProps) {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const loading = useSelector(selectLoading);
  const walletsList = useSelector(selectWithdrawalWallets);

  const {currencyId} = route.params;

  useFocusEffect(
    useCallback(() => {
      dispatch(getWithdrawalWallets({currencyId}));

      return () => {
        dispatch(clearWalletAddress());
      };
    }, []),
  );

  const onAddWallet = () => {
    navigation.navigate('WithdrawalWalletsOperations', {
      currencyId,
      type: 'create',
    });
  };

  const onLoadMore = () => {
    dispatch(getWithdrawalWallets({currencyId}, true));
  };

  const onRefresh = () => {
    dispatch(getWithdrawalWallets({currencyId}));
  };

  const renderItemWallet = ({item}: {item: WithdrawWallet}) => {
    const onPress = () => {
      dispatch(setWithdrawForm({requisites: item.address}));
      navigation.goBack();
    };

    return <ItemWallet {...item} onPress={onPress} />;
  };

  return (
    <SafeContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={walletsList}
        renderItem={renderItemWallet}
        keyExtractor={item => item.id.toString()}
        refreshing={loading}
        refreshControl={
          <RefreshLoader refreshing={loading} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.2}
        onEndReached={onLoadMore}
        ListEmptyComponent={EmptyList}
      />

      <ButtonGradient title={t('common.m_add_address')} onPress={onAddWallet} />
    </SafeContainer>
  );
}
