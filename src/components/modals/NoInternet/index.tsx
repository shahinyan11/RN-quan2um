import React from 'react';
import {Text, View} from 'react-native';

import st from './styles';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';
import {LogoIcon, WiFiIcon} from '@assets/svgs/others';

export default function NoInternet() {
  const {t} = useTranslation();

  return (
    <View style={st.container}>
      <View style={st.logoContainer}>
        <LogoIcon />
      </View>

      <View style={st.background} />
      <View style={{paddingHorizontal: 10, width: '100%'}}>
        <View style={st.sheet}>
          <View style={{alignItems: 'center'}}>
            <WiFiIcon />
          </View>
          <Text style={st.title}>{t('modal_internet.title')}</Text>
          <Text style={st.desc}>{t('modal_internet.description')}</Text>

          <View style={st.buttonContainer}>
            <ButtonGradient
              disabled={false}
              title={t('common.repeat')}
              onPress={() => {}}
              gradientColors={['#00FF75', '#0075FF']}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
