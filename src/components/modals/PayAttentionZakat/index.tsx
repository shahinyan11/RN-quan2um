import React from 'react';
import {useDispatch} from 'react-redux';
import {Pressable, Text, TouchableOpacity, View} from 'react-native';
import {hideModal} from '@store/modal/actions';
import {Close} from '@assets/svgs';
import st from './styles';
import {useTranslation} from 'react-i18next';

export default function PayAttentionZakat() {
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
        {/*{t('charity.pay_attention')}*/}
        Обратите внимание!
      </Text>
      <Text style={st.text}>
        {/*{t('charity.if_you_apply_for_zakat')}*/}
        Если вы отправите заявку на закят, то не сможете участвовать в сборе
        персональной помощи
      </Text>
      <Pressable style={st.button}>
        <Text style={st.buttonText}>
          {/*{t('common.agree')}*/}
          Согласен
        </Text>
      </Pressable>
      <Pressable>
        <Text style={st.greenText}>
          {/*{t('common.cancel_registration')}*/}
          Отменить регистрацию
        </Text>
      </Pressable>
    </View>
  );
}
