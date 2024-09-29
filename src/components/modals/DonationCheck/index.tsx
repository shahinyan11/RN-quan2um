import React from 'react';
import {useDispatch} from 'react-redux';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';
import {celebrateImg} from '@constants/images';
import {scaledSize} from '@utils/scaledSize';

export default function DonationCheck() {
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
      <Image source={celebrateImg} style={{width: '100%'}} />
      <View style={{padding: scaledSize(20)}}>
        <Text style={st.title}>{t('charity.thanks_for_good_deed')}</Text>
        <Text style={st.text}>
          {t('charity.personal_assistance_you_sent_count_btc', {
            count: 0.003,
          })}
        </Text>

        <Pressable style={st.button}>
          <Text style={st.buttonText}>{t('common.to_check')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
