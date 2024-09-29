import React, {useEffect, useCallback, useLayoutEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

import Text from '@components/textes/Text';
import SafeContainer from '@components/containers/SafeContainer';
import ContainerItem from '@components/containers/ContainerItem';
import Row from '@components/containers/Row';
import ButtonDark from '@components/buttons/ButtonDark';
import ImageGradient from '@components/icons/ImageGradient';
import {CurrencyDetailNavigation} from '@navigation/WalletNavigation';
import {WalletCurrencyProps} from '@navigation/config/types';
import useFetch from '@hooks/useFetch';
import {ACCOUNT_WALLET_CURRENCIES} from '@api';
import {IWalletCurrencyDetail} from '@store/account/types';
import styles from './styles';
import {clearTransactions} from '@store/account';
import {setPairCode} from '@store/tradeview';

interface IBox {
  label: string;
  value: string;
  amount: number;
  type?: 'bottom' | 'top';
}

const Box = ({label, value, amount, type = 'bottom'}: IBox) => (
  <ContainerItem
    containerStyle={
      type === 'bottom' ? styles.bottomContainerStyle : styles.topContainerStyle
    }>
    <Text type="tTiny" style={styles.labelStyle}>
      {label}
    </Text>
    <Text type="t4" style={styles.valueStyle}>
      {value}
    </Text>
    <Text type="tTiny" style={styles.amountStyle}>
      $ {amount}
    </Text>
  </ContainerItem>
);

const DEFAULT_WALLET_CURRENCY: IWalletCurrencyDetail = {
  currency: {
    name: '',
    code: '',
    color_hex: '#FFFFFF',
    color_hex2: '#FFFFFF',
    logo: '',
    can_deposit: false,
    can_withdrawal: false,
  },
  total_usd: 0,
  total: '0',
  used: '0',
  used_usd: 0,
  available: '0',
  available_usd: 0,
};

export default function WalletCurrency({
  navigation,
  route,
}: WalletCurrencyProps) {
  const {t} = useTranslation();
  const {currencyId, pairCode} = route.params;

  const dispatch = useDispatch();

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(clearTransactions());
    }, []),
  );

  const onPutIn = () => {
    navigation.navigate('Refill', {
      currencyId,
    });
  };

  const onPutOut = () => {
    navigation.navigate('Withdrawal', {
      currencyId,
    });
  };

  const onTransactions = () => {
    navigation.navigate('Transfer', {currencyId});
  };

  const onTrade = useCallback(() => {
    if (pairCode) {
      dispatch(setPairCode(pairCode));
    }

    navigation.reset({
      index: 0,
      routes: [{name: 'TradeView'}],
    });
  }, [navigation]);

  const {
    response = DEFAULT_WALLET_CURRENCY,
    isLoading,
    refresh,
  } = useFetch<IWalletCurrencyDetail>({
    url: `${ACCOUNT_WALLET_CURRENCIES}/${currencyId}`,
  });

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      refresh();
    });

    return focusListener;
  }, [navigation, refresh]);

  const {currency, total_usd, total, used, used_usd, available, available_usd} =
    response;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currency?.name,
      headerRight: () => (
        <TouchableOpacity
          onPress={onTrade}
          style={styles.headerRightContainerStyle}>
          <Text type="textRegular" style={styles.headerRightTitleStyle}>
            {t('common.trade')}
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, currency?.name, onTrade]);

  return (
    <SafeContainer loading={isLoading}>
      <Row
        justifyContent="space-between"
        containerStyle={styles.headerContainerStyle}>
        <View style={styles.leftBlockContainerStyle}>
          <ContainerItem containerStyle={styles.topContainerStyle}>
            <ImageGradient
              url={currency.logo_png}
              colors={[currency?.color_hex, currency?.color_hex2]}
            />

            <Text type="t4" style={styles.valueStyle}>
              {currency?.code}
            </Text>
            <Text type="t5" style={styles.amountStyle}>
              {currency?.name}
            </Text>
          </ContainerItem>
          <Box
            label={t('common.available')}
            value={available}
            amount={available_usd}
          />
        </View>
        <View style={styles.rightBlockContainerStyle}>
          <Box
            type="top"
            label={t('common.total')}
            value={total}
            amount={total_usd}
          />
          <Box label={t('assets.m_frozen')} value={used} amount={used_usd} />
        </View>
      </Row>

      <CurrencyDetailNavigation currencyId={currencyId} />

      <Row containerStyle={styles.bottomNavigationContainerStyle}>
        {currency.can_deposit && (
          <ButtonDark icon={{name: 'put-in', size: 16}} onPress={onPutIn} />
        )}
        {currency.can_withdrawal && (
          <ButtonDark icon={{name: 'put-out', size: 16}} onPress={onPutOut} />
        )}
        {available !== '0' && (
          <ButtonDark
            icon={{name: 'credit-card', size: 16}}
            onPress={onTransactions}
          />
        )}
      </Row>
    </SafeContainer>
  );
}
