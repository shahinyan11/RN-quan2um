import React from 'react';
import {Image, Pressable, StyleProp, Text, View, ViewStyle} from 'react-native';
import {useTranslation} from 'react-i18next';
import st from './styles';
import {notDonationPAImg} from '@constants/images';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  type: 'fund' | 'personal' | 'zakat' | 'sadaka';
  onPress: () => void;
  buttonText?: string;
}

export default function NotDonations({
  containerStyle,
  type,
  onPress,
  buttonText,
}: Props) {
  const {t} = useTranslation();
  return (
    <View style={[st.container, containerStyle]}>
      <Image
        source={notDonationPAImg}
        style={{width: '100%'}}
        resizeMode={'stretch'}
      />
      <Text style={st.title}>{t('charity.no_donations_yet')}</Text>
      <Text style={st.text}>{t('charity.check_out_charities')}</Text>
      <Pressable style={st.button} onPress={onPress}>
        <Text style={st.buttonText}>{buttonText || t('common.continue')}</Text>
      </Pressable>
    </View>
  );
}
