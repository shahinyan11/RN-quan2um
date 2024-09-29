import React from 'react';
import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import st from './styles';

export default function Nisab() {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const handleClick = () => {
    // navigation.navigate('CheckTransactionScreen');
  };

  return (
    <SafeScrollContainer
      safeContainerStyle={st.safeContainer}
      containerStyle={st.container}>
      <View style={{marginHorizontal: 20}}>
        <Text style={st.title}> {t('charity.nasib_title')}</Text>
        <Text style={st.text}>{t('charity.nasib_description')}</Text>

        <TouchableOpacity style={st.button} onPress={handleClick}>
          <Text style={st.buttonText}>{t('charity.go_to_explorer')}</Text>
        </TouchableOpacity>
      </View>
    </SafeScrollContainer>
  );
}
