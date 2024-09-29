import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function AuthorizationRequired() {
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
        Необходима авторизация
      </Text>
      <Text style={st.text}>
        {/*{t('charity.must_be_logged_in')}*/}
        Для выполнения этого действия необходимо войти в систему.
      </Text>
      <Pressable style={st.button}>
        <Text>{t('auth.enter')}</Text>
      </Pressable>
      <Pressable>
        <Text style={st.greenText}>
          {/*{t('common.register')}*/}
          Зарегистрироваться
        </Text>
      </Pressable>
    </View>
  );
}
