import React from 'react';
import {useSelector} from 'react-redux';

import KeyboardListener from '@components/listeners/KeyboardListener';
import SafeContainer from '@components/containers/SafeContainer';
import InputText from '@components/inputs/InputText';
import {SIProps} from '@navigation/config/types';
import {selectLoading} from '@store/auth';
import st from './styles';
import {
  AppleGradient,
  FacebookGradient,
  GoogleGradient,
  TelegramGradient,
} from '@assets/svgs';
import {Image, Text, View} from 'react-native';
import {logoQuan2umImage} from '@constants/images';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';

export default function SignUp({navigation}: SIProps) {
  const {t} = useTranslation();
  const isLoading = useSelector(selectLoading);

  return (
    <SafeContainer loading={isLoading}>
      <KeyboardListener containerStyle={st.sfContainerStyle}>
        <Image source={logoQuan2umImage} style={st.image} />
        {/*<InputCode value={''} onChangeText={() => {}} />*/}
        <View style={{width: '100%'}}>
          <InputText
            placeholder={t('auth.enter_your_email')}
            placeholderColor={'#748FA4'}
            inputStyle={st.input}
            inputContainerStyle={st.inputContainer}
          />
        </View>
        <ButtonGradient
          containerStyle={st.button}
          titleStyle={st.buttonTitle}
          title={t('common.onwards')}
          onPress={() => {}}
          gradientColors={['#00E98C', '#008AEA']}
        />
        {}
        <Text style={st.text}>{t('auth.register_with')}</Text>
        <View style={st.socials}>
          <GoogleGradient />
          <AppleGradient />
          <FacebookGradient />
          <TelegramGradient />
        </View>
      </KeyboardListener>
    </SafeContainer>
  );
}
