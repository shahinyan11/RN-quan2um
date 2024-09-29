import React, {useEffect, useState} from 'react';
import {View, BackHandler} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import KeyboardListener from '@components/listeners/KeyboardListener';
import ButtonSend from '@components/buttons/ButtonSend';
import Input from '@components/inputs/Input';
import ButtonGradient from '@components/buttons/ButtonGradient';

import styles from './styles';
import {SUVerificationEmailProps} from '@navigation/config/types';
import {onSendCode, onVerifyAccount} from '@store/auth/actions';

export default function VerificationEmail({route}: SUVerificationEmailProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {email} = route.params;
  const [code, setCode] = useState('');

  const onSend = () => {
    dispatch(onSendCode(email));
  };

  const onSubmit = () => {
    dispatch(
      onVerifyAccount({
        username: email,
        code,
      }),
    );
  };

  useEffect(() => {
    const btnBackListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );

    return btnBackListener.remove();
  }, []);

  return (
    <SafeContainer>
      <KeyboardListener containerStyle={styles.sfContainerStyle}>
        <View>
          <Text type="t4">{t('auth_email_sent.registration_title')}</Text>
          <Text type="description" style={styles.verificationMessageStyle}>
            {`${t('auth_email_sent.m_verif_email_sent')} `}
            <Text type="description" style={styles.valueStyle}>
              {email}
            </Text>
          </Text>

          <ButtonSend timerDisabled={false} onSubmit={onSend} />

          <Input
            secureTextEntry={true}
            label={t('common.m_code')}
            placeholder={t('common.enter_code')}
            keyboardType="number-pad"
            containerStyle={styles.inpContainerStyle}
            value={code}
            textContentType="oneTimeCode"
            maxLength={6}
            onChangeText={setCode}
          />
        </View>

        <ButtonGradient
          disabled={!(code.length === 6)}
          title={t('common.next_step')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
