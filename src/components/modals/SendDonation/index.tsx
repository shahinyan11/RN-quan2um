import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import st from './styles';
import {useTranslation} from 'react-i18next';
import InputText from '@components/inputs/InputText';
import {useDispatch} from 'react-redux';
import {hideModal, showModal} from '@store/modal';
import {t4, t5, t6} from '@constants/globalStyles';
import {celebrateImg} from '@constants/images';
import {fundDonate, moneyCollectionDonate} from '@store/charity';
import {navigationRef} from '@navigation/index';

export type SendDonationProps = {
  id: number;
  balance?: string;
  isFund?: boolean;
};

export default function SendDonation({
  id,
  isFund = false,
  balance,
}: SendDonationProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  const closeModal = () => dispatch(hideModal());

  const handleDonate = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: {
          // @ts-ignore
          title: t('charity.personal_assistance_going_to_donate', {
            count: amount,
          }),
          firstBtnText: t('common.i_confirm'),
          firstBtnAction: onDonationConfirm,
        },
      }),
    );
  };

  const onDonationConfirm = () => {
    if (isFund) {
      dispatch(
        fundDonate({
          params: {
            charity_foundation_id: id,
            amount: +amount,
          },
          callback: onDonationSuccess,
        }),
      );
    } else {
      dispatch(
        moneyCollectionDonate({
          params: {
            money_collection_id: id,
            amount: +amount,
          },
          callback: onDonationSuccess,
        }),
      );
    }
  };

  const onDonationSuccess = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: {
          image: celebrateImg,
          title: t('charity.thanks_for_good_deed'),
          description: t('charity.personal_assistance_you_sent_count_btc', {
            count: amount,
          }),
          firstBtnText: t('common.to_check'),
          firstBtnAction: () => {},
        },
      }),
    );
  };

  const onPressAll = () => setAmount(balance);

  const onPressTopUp = () => {
    dispatch(hideModal());
    navigationRef.current?.navigate('TradeView');
  };

  const handleChange = (val: string) => {
    setAmount(val.replace(/(\.|,)+/g, '.'));
  };

  return (
    <View style={st.container}>
      <Pressable style={{flex: 1}} onPress={closeModal} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={st.sheet}>
          <View style={st.indicator} />
          <Text style={[st.text, st.title]}>{t('charity.send_donation')}</Text>
          <Text style={[st.textLight, t6]}>
            {t('invest_mn.want_to_invest')}
          </Text>
          <InputText
            value={amount}
            onChangeText={handleChange}
            keyboardType="numeric"
            inputContainerStyle={st.inputContainerStyle}
            inputStyle={[st.textLight, t4]}
            addAfter={
              <View style={st.after}>
                <TouchableOpacity onPress={onPressAll}>
                  <Text style={st.textActive}>{t('common.all')}</Text>
                </TouchableOpacity>
                <View style={st.line} />
                <Text style={[st.textLight, t4]}>BTCa</Text>
              </View>
            }
          />
          <Text style={{marginBottom: 10}}>
            <Text style={[st.textLight, t5]}>{t('charity.your_balance')} </Text>
            <Text style={[st.text, t5]}> {balance} BTCa</Text>
          </Text>
          <TouchableOpacity onPress={onPressTopUp}>
            <Text style={st.textUnderline}>{t('charity.top_up_balance')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={st.button} onPress={handleDonate}>
            <Text style={st.buttonText}>{t('charity.donate')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
