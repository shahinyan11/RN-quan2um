import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function KycPersonalAssistance() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <Close size={20} color={'#373737'} />
      </TouchableOpacity>
      <Text style={st.title}>
        {/*{t('charity.personal_assistance_need_kyc')}*/}
        Чтобы запросить персональную помощь, необходимо пройти KYC-верификацию
      </Text>
      <Pressable style={st.button} onPress={handleClose}>
        <Text style={st.buttonText}>{t('charity.pass_kyc_verification')}</Text>
      </Pressable>
    </View>
  );
}
