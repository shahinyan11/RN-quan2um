import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import st from './styles';

import {Props} from './types';
import {scaledSize} from '@utils/scaledSize';
import {SvgUri} from 'react-native-svg';

export default function TransactionCardExchange({item}: Props) {
  const {t} = useTranslation();

  return (
    <View style={st.transactionCard}>
      <View style={st.row}>
        <Text style={st.text}>{t('common.currency')}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SvgUri
            width={scaledSize(16)}
            height={scaledSize(16)}
            style={st.icon}
            uri={`https://api.quan2um.com/images/currencies/${item?.currency.slug}.svg`}
          />
          <Text>
            <Text style={st.textWhite}>{item.currency.code}</Text>
            <Text style={st.text}>{` / ${item.currency.name}`}</Text>
          </Text>
        </View>
      </View>
      <View style={st.row}>
        <Text style={st.text}>{t('common.quantity')}</Text>
        <Text style={st.greenText}>{item.amount_face}</Text>
      </View>
      <View style={st.row}>
        <Text style={st.text}>{t('common.status')}</Text>
        <Text style={st.yellowText}>{item.status}</Text>
      </View>
      <View style={st.row}>
        <Text style={st.text}>{t('common.date_time')}</Text>
        <Text style={[st.textWhite, {textAlign: 'right'}]}>
          {moment(item.time * 1000).format('YYYY/MM/DD hh:mm:ss')}
        </Text>
      </View>
    </View>
  );
}
