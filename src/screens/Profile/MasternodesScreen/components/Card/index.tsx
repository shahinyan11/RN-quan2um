import React from 'react';
import {Text, View} from 'react-native';
import {deg} from 'react-native-linear-gradient-degree';
import LinearGradient from 'react-native-linear-gradient';

import * as SVG from '@assets/svgs/others';
import {Props} from './types';
import st from './styles';
import {useTranslation} from 'react-i18next';
import FitCurrency from '@components/FitCurrency';

const data = {
  balance: {
    text: 'common.balance',
    balanceAddition: 'BTCa',
    colors: ['rgba(0, 190, 216, 0.08)', 'rgba(0, 190, 216, 0)'],
    icon: <SVG.Balance />,
  },
  deposit: {
    text: 'common.deposit',
    balanceAddition: 'BTCa',
    colors: ['rgba(0, 151, 216, 0)', 'rgba(0, 151, 216, 0.08)'],
    icon: <SVG.Deposit />,
  },
  profit: {
    text: 'common.profit',
    balanceAddition: 'BTCa',
    colors: ['rgba(0, 216, 157, 0.08)', 'rgba(0, 216, 157, 0)'],
    icon: <SVG.Profit />,
  },
  award: {
    text: 'common.reward',
    balanceAddition: 'BTCa',
    colors: ['rgba(252, 194, 36, 0.08)', 'rgba(252, 194, 36, 0)'],
    icon: <SVG.Reward />,
  },
  commission: {
    text: 'common.fee',
    balanceAddition: 'BTCa',
    colors: ['rgba(216, 130, 0, 0.08)', 'rgba(216, 130, 0, 0)'],
    icon: <SVG.Commission />,
  },
  masternodes: {
    text: 'common.masternodes',
    balanceAddition: '',
    colors: ['rgba(121, 0, 216, 0.08)', 'rgba(121, 0, 216, 0)'],
    icon: <SVG.Masternode />,
  },
};

export default function Card({type, amount = 0}: Props) {
  const {text, colors, icon, balanceAddition} = data[type];
  const {t} = useTranslation();
  return (
    <LinearGradient colors={colors} style={st.container} {...deg(160)}>
      {icon}
      <View>
        <Text style={st.textSmall}>{t(text)}</Text>

        {balanceAddition && (
          <FitCurrency amount={amount} currency={balanceAddition} />
        )}

        {!balanceAddition && (
          <Text style={st.text}>
            {amount} {balanceAddition}
          </Text>
        )}
      </View>
    </LinearGradient>
  );
}
