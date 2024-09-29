import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function VerificationKYC() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <Close size={14} color={'#373737'} />
      </TouchableOpacity>
      <Text style={st.title}>
        {/*{t('charity.need_pass_KYC_verification')}*/}
        Чтобы создать страницу фонда и собирать пожертвования, необходимо пройти
        KYC-верификацию как бизнес-аккаунт.
      </Text>

      <Pressable style={st.button}>
        <Text>{t('charity.pass_kyc_verification')}</Text>
      </Pressable>
    </View>
  );
}
