import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function DonationConfirm() {
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
        {/*{t('charity.authorization_required')}*/}
        Вы собираетесь пожертвовать в фонд помощи животных 0.003 BTCa
      </Text>

      <TouchableOpacity style={st.button}>
        <Text style={st.buttonText}>{t('charity.i_confirm')}</Text>
      </TouchableOpacity>
    </View>
  );
}
