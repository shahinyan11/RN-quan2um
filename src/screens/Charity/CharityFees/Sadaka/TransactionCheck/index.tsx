import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import Clipboard from '@react-native-community/clipboard';
import InputText from '@components/inputs/InputText';
import {onSuccessMessage} from '@store/app';
import {Copy} from '@assets/svgs/others';
import moment from 'moment';
import st from './styles';

export default function TransactionCheck() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {params} = useRoute();
  const transaction = params?.transaction;

  const handleCopy = (text: string) => () => {
    Clipboard.setString(text);

    dispatch(onSuccessMessage(t('common.copy_clipboard')));
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <Text style={st.title}>
        {t('charity.allocation_report', {
          number: transaction.id,
          startDate: moment(transaction?.start_date).format('DD.MM.YY'),
          endDate: moment(transaction?.end_date).format('DD.MM.YY'),
        })}
      </Text>
      <Text style={st.desc}>{t('charity.click_account_number')}</Text>
      <View style={st.infoContainer}>
        <View style={st.row}>
          <Text style={st.textKey}>{t('charity.funds_collected')}</Text>
          <Text style={st.textValue}>
            {t('charity.amount_btca', {amount: transaction?.amount})}
          </Text>
        </View>
        <View style={st.row}>
          <Text style={st.textKey}>{t('charity.applications_received')}</Text>
          <Text style={st.textValue}>
            {t('charity.count_applications', {
              count: transaction?.user_count,
            })}
          </Text>
        </View>
        <View style={st.row}>
          <Text style={st.textKey}>{t('charity.dates_holding')}</Text>
          <Text style={st.textValue}>
            {moment(transaction?.start_date).format('DD.MM.YY')}
            {' - '}
            {moment(transaction?.end_date).format('DD.MM.YY')}
          </Text>
        </View>
      </View>
      {transaction.wallets?.map((value, index) => (
        <InputText
          key={index}
          value={value}
          label={`${t('charity.recipients_wallet')}`}
          labelStyle={st.label}
          inputContainerStyle={st.inputContainer}
          inputStyle={st.inputText}
          editable={false}
          addAfter={
            <TouchableOpacity onPress={handleCopy(value)}>
              <Copy size={20} color={'#373737'} />
            </TouchableOpacity>
          }
        />
      ))}

      {/*<Pressable onPress={sendDonate} style={st.button}>*/}
      {/*  <Text style={st.buttonText}>{t('charity.load_more')}</Text>*/}
      {/*</Pressable>*/}
    </SafeScrollContainer>
  );
}
