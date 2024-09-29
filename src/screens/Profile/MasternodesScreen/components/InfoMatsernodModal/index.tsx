import React from 'react';
import {useDispatch} from 'react-redux';
import {Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function InfoMatsernodModal() {
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
      <Text style={st.title}>{t('invest_mn.info_masternodes_title')}</Text>
      <Text style={st.text}>{t('invest_mn.info_masternodes_text_1')}</Text>
      <Text style={st.text}>{t('invest_mn.info_masternodes_text_2')}</Text>
      {/*<ButtonGradient*/}
      {/*  disabled={false}*/}
      {/*  title={t('common.calculator')}*/}
      {/*  onPress={() => {}}*/}
      {/*  gradientColors={['#00FF75', '#0075FF']}*/}
      {/*/>*/}
    </View>
  );
}
