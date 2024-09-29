import React from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {investSuccess} from '@constants/images';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function InvestSuccessModal() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(hideModal());
  };

  return (
    <View style={st.content}>
      <TouchableOpacity style={st.icon} onPress={handleClose}>
        <Close size={14} color={'white'} />
      </TouchableOpacity>
      <Image source={investSuccess} style={st.image} />
      <Text style={st.title}>{t('invest_mn.invest_success_title')}</Text>
      <Text style={st.text}>{t('invest_mn.invest_success_desc')}</Text>
    </View>
  );
}
