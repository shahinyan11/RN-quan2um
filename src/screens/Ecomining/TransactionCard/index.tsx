import React from 'react';
import {Linking, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';

import {Props} from './types';
import moment from 'moment/moment';
import toFixedNumber from '@utils/toFixedNumber';

export default function TransactionCardMN({item}: Props) {
  const {t} = useTranslation();

  return (
    <View style={st.transactionCard}>
      <View style={st.row}>
        <Text
          style={st.textUnderline}
          onPress={() => Linking.openURL(item.explorer_url)}>
          {`${item.node_name} ${item.node_code}`}
        </Text>
      </View>
      {item.kind !== 2 && (
        <View style={st.row}>
          <Text style={st.keyText}>
            {item.kind === 1 ? t('common.refill') : t('common.withdraw')}
          </Text>
          <Text style={st.valueText}>
            {item.kind === 1 ? '+' : '-'} {`${item.amount_face} ${item.code}`}
          </Text>
        </View>
      )}
      {item.kind === 2 && (
        <>
          <View style={st.row}>
            <Text style={st.keyText}>{t('common.reward')}</Text>
            <Text style={[st.valueText, st.yellowText]}>
              + {`${item.amount_face} ${item.code}`}
            </Text>
          </View>
          <View style={st.row}>
            <Text style={st.keyText}>{t('common.fee')}</Text>
            <Text style={[st.valueText, st.redText]}>
              - {`${item.fee_face} ${item.code}`}
            </Text>
          </View>
          <View style={st.row}>
            <Text style={st.keyText}>{t('common.profit')}</Text>
            <Text style={[st.valueText, st.greenText]}>
              {`+ ${toFixedNumber(+item.amount_face - +item.fee_face)} `}
              {item.code}
            </Text>
          </View>
        </>
      )}

      <View style={st.row}>
        <Text style={st.keyText}>{t('common.date_and_time')}</Text>
        <Text style={st.valueText}>
          {moment(item.time * 1000).format('YYYY/MM/DD hh:mm:ss')}
        </Text>
      </View>
    </View>
  );
}
