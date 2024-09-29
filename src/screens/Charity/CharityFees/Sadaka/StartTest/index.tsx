import React from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {useDispatch} from 'react-redux';
import {testInit} from '@store/charity';
import {showModal} from '@store/modal';
import {PAY_ATTENTION} from '@components/modals/Information/constantProps';
import {MONEY_COLLECTION_IDS} from '@constants/index';

export default function StartTest() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      showModal({
        modalType: 'INFORMATION',
        modalProps: {
          ...PAY_ATTENTION,
          firstBtnAction: onAgree,
        },
      }),
    );
  };

  const onAgree = () => {
    dispatch(testInit(MONEY_COLLECTION_IDS.SADAKA));
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <View>
        <Text style={st.title}> {t('charity.application_test_title')}</Text>
        <Text style={st.text}>{t('charity.application_test_description')}</Text>
      </View>
      <TouchableOpacity style={st.button} onPress={handleClick}>
        <Text style={st.buttonText}>{t('charity.pass_the_test')}</Text>
      </TouchableOpacity>
    </SafeScrollContainer>
  );
}
