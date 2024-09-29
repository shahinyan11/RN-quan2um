import React from 'react';
import {useDispatch} from 'react-redux';
import {Image, Text, TouchableOpacity, View} from 'react-native';

import {investSuccess} from '@constants/images';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export interface ExchangeCompleteProps {
  amount: number;
}

export default function ExchangeComplete({amount}: ExchangeCompleteProps) {
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
      <Text style={st.title}>{t('exchange.exchange_is_complete')}</Text>
      <Image source={investSuccess} style={st.image} />
      <Text style={st.text}>{t('exchange.you_have_been_credited')}</Text>
      {amount && <Text style={st.amount}>{amount}</Text>}
    </View>
  );
}
