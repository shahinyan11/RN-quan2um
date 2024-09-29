import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function AlreadyAppliedZakat() {
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
      <Text style={st.title}>{t('charity.already_applied_for_zakat')}</Text>
      <Pressable style={st.button} onPress={handleClose}>
        <Text style={st.buttonText}>
          {/*{t('common.well')}*/}
          Хорошо
        </Text>
      </Pressable>
    </View>
  );
}
