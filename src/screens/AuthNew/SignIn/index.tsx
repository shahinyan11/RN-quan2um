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
  Eye,
  FacebookGradient,
  GoogleGradient,
  TelegramGradient,
} from '@assets/svgs';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {logoQuan2umImage} from '@constants/images';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {useTranslation} from 'react-i18next';

export default function SignIn({navigation}: SIProps) {
  const {t} = useTranslation();
  const isLoading = useSelector(selectLoading);

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeContainer loading={isLoading}>
      <KeyboardListener containerStyle={st.sfContainerStyle}>
        <Image source={logoQuan2umImage} style={st.image} />
        <View style={{width: '100%'}}>
          <InputText
            placeholder={t('auth.enter_email_or_phone')}
            placeholderColor={'#748FA4'}
            inputStyle={st.input}
            inputContainerStyle={[st.inputContainer, st.mb_12]}
          />
          <InputText
            placeholder={t('auth.enter_password')}
            placeholderColor={'#748FA4'}
            inputStyle={st.input}
            inputContainerStyle={st.inputContainer}
            addAfter={<Eye size={20} color={'white'} />}
          />
          <Text style={st.textForgot}>{t('auth.button_forgot_password')}</Text>
        </View>
        <ButtonGradient
          containerStyle={st.button}
          titleStyle={st.buttonTitle}
          title={t('auth.enter')}
          onPress={() => {}}
          gradientColors={['#00E98C', '#008AEA']}
        />
        <View style={st.socials}>
          <GoogleGradient />
          <AppleGradient />
          <FacebookGradient />
          <TelegramGradient />
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={st.text}>{t('auth.no_account')}</Text>
          <TouchableOpacity onPress={navigateToSignUp}>
            <Text style={st.textCreate}>{t('common.create')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardListener>
    </SafeContainer>
  );
}
