import React from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';

import {Props} from './types';
import moment from 'moment/moment';

export default function TransactionCardMN({item}: Props) {
  const {t} = useTranslation();

  return (
    <View style={st.transactionCard}>
      <View style={st.row}>
        <Text style={st.text}>{t('common.count')}</Text>
        <Text style={st.textWhite}>{item.amount_face + item.code}</Text>
      </View>
      <View style={st.row}>
        <Text style={st.greenText}>{t('common.information')}</Text>
        <Text style={st.textWhite}>{item.kind_name}</Text>
      </View>
      <View style={st.row}>
        <Text style={st.yellowText}>{t('common.name')}</Text>
        <Text style={st.textWhite}>{item.node_name}</Text>
      </View>
      <View style={st.row}>
        <Text style={st.text} numberOfLines={1}>
          {t('common.address_mn')}
        </Text>
        <Text style={st.textWhite} numberOfLines={1}>
          {item.address}
        </Text>
      </View>
      <View style={st.row}>
        <Text style={st.text}>{t('common.date')}</Text>
        <Text style={st.textWhite}>
          {moment(item.time * 1000).format('YYYY/MM/DD hh:mm:ss')}
        </Text>
      </View>
    </View>
  );
}
