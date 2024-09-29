import React, {useEffect, useMemo, useState} from 'react';
import {Linking, Pressable, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import Clipboard from '@react-native-community/clipboard';
import {useTranslation} from 'react-i18next';
import currency from 'currency.js';

import {
  selectCurrentExchange,
  selectSelectedMethod,
} from '@store/exchange/selectors';
import {onSuccessMessage} from '@store/app';
import {EXCHANGE_TABS} from '@constants/tabs';
import {linkReg} from '@constants/regesps';
import * as SVG from '@assets/svgs/others';
import {ArrowLongDown} from '@assets/svgs';
import cleanNumber from '@utils/cleanNumber';
import Text from '@components/textes/Text';
import ExchangeCurrency from '../ExchangeCurrency';
import st from './styles';

interface Props {
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  fromAmount: string;
  toAmount: string;
  tab: number;
}

export default function ExchangeCard({
  fromAmount,
  toAmount,
  onToChange,
  onFromChange,
  tab,
}: Props) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const white50 = EStyleSheet.value('$white50');
  const [isExchangeActive, setIsExchangeActive] = useState(false);
  const currentExchange = useSelector(selectCurrentExchange);
  const selectedMethod = useSelector(selectSelectedMethod);

  useEffect(
    () => {
      if (currentExchange) {
        setIsExchangeActive(true);

        onFromChange(currentExchange.amount);
        const rate = currency(selectedMethod.rate, {precision: 2});
        const toDecimals = selectedMethod?.currencyTo.decimals;
        const _toAmount = currency(currentExchange.amount, {
          precision: toDecimals,
        })
          .multiply(rate)
          .subtract(fee);

        onToChange(_toAmount.toString());
      } else {
        setIsExchangeActive(false);
        onFromChange('');
        onToChange('');
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentExchange],
  );

  const fee = useMemo(() => {
    return tab === EXCHANGE_TABS.DEPOSIT.id
      ? selectedMethod?.deposit_fee
      : selectedMethod?.withdraw_fee;
  }, [tab, selectedMethod]);

  const handleFromChange = ({nativeEvent}: any) => {
    const toDecimals = selectedMethod?.currencyTo.decimals;

    const amount = cleanNumber(nativeEvent.text);
    onFromChange(amount);

    const _toAmount = currency(amount, {precision: toDecimals})
      .multiply(selectedMethod.rate)
      .subtract(fee);

    onToChange(_toAmount.toString());
  };

  const handleToChange = ({nativeEvent}: any) => {
    const amount = cleanNumber(nativeEvent.text);
    onToChange(amount);

    const fromDecimals = selectedMethod?.currencyFrom.decimals;
    const _fromAmount = currency(amount, {precision: fromDecimals})
      .subtract(fee)
      .divide(selectedMethod.rate);

    onFromChange(_fromAmount.toString());
  };

  const onCopyAddress = () => {
    Clipboard.setString(currentExchange.cryptoaddress);

    dispatch(onSuccessMessage(t('common.copy_clipboard')));
  };

  const link = currentExchange?.link?.match(linkReg)?.[0];

  return (
    <View style={st.container}>
      <View style={st.currenciesContainer}>
        <View style={st.topCard}>
          <ExchangeCurrency
            title={t('common.pay')}
            onChange={handleFromChange}
            value={fromAmount}
            data={selectedMethod?.currencyFrom}
            editable={!isExchangeActive}
          />
        </View>
        <View style={st.bottomCard}>
          <ExchangeCurrency
            title={t('common.get')}
            onChange={handleToChange}
            value={toAmount}
            data={selectedMethod?.currencyTo}
            editable={!isExchangeActive}
          />
        </View>
        <View style={st.changeButton}>
          <ArrowLongDown />
        </View>
      </View>
      {currentExchange?.address && (
        <View style={st.addressRow}>
          <Text type={'btnMini'} style={st.address}>
            {currentExchange.address}
          </Text>
          <Pressable onPress={onCopyAddress}>
            <SVG.Copy size={14} color={white50} />
          </Pressable>
        </View>
      )}
      {isExchangeActive ? (
        <View style={st.checkAccuracy}>
          <Text type={'t5'}>{currentExchange?.text || ''}</Text>
          {link && (
            <Pressable onPress={() => Linking.openURL(link)}>
              <Text style={st.link}>{link}</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={st.rate}>
          <Text type={'description'}>Курс</Text>
          <Text type={'description'}>
            {(1 / selectedMethod?.rate)?.toFixed(2)} {selectedMethod.from_short}{' '}
            = 1{selectedMethod?.to_short}
          </Text>
        </View>
      )}
    </View>
  );
}
