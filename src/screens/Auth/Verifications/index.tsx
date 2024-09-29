import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import InputEmail from '@components/inputs/InputEmail';

import Text from '@components/textes/Text';
import ButtonSend from '@components/buttons/ButtonSend';
import ButtonGradient from '@components/buttons/ButtonGradient';
import ButtonLogout from '@components/buttons/ButtonLogout';
import Row from '@components/containers/Row';
import Input from '@components/inputs/Input';
import KeyboardListener from '@components/listeners/KeyboardListener';

import {onUpdateEmail, onUpdateEmailVerification} from '@store/account';

import styles from './styles';

import {emailValid} from '@utils/validation';

export default function Verifications() {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [emailVerificationCode, setEmailCode] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [errorEmail, setErrorEmail] = useState(' ');
  const [isCodeSend, setIsSendCode] = useState(false);

  const onSendEmailVerificationCode = () => {
    dispatch(
      onUpdateEmail({
        data: {
          email,
        },
      }),
    );

    setIsSendCode(true);
  };

  const onVerificationEmail = () => {
    dispatch(onUpdateEmailVerification(emailVerificationCode));
  };

  useEffect(() => {
    setIsEmailValid(emailValid(email));
  }, [email]);

  const handleOnBlurEmail = () => {
    const valid = emailValid(email);
    if (valid) {
      setErrorEmail(' ');
    } else {
      setErrorEmail(t('validation.m_wrong-email'));
    }
  };

  return (
    <SafeContainer containerStyle={styles.containerStyle}>
      <KeyboardListener>
        <Row
          justifyContent="space-between"
          containerStyle={styles.headerContainerStyle}>
          <View style={styles.leftHeaderContainerStyle} />
          <Text textAlign="center" type="t4">
            {t('header.verification')}
          </Text>

          <View style={styles.rightHeaderContainerStyle}>
            <ButtonLogout />
          </View>
        </Row>

        <View style={styles.centerContainerStyle}>
          <View style={styles.blockContainerStyle}>
            <InputEmail
              label={t('common.email')}
              placeholder={t('common.email')}
              value={email}
              onChangeText={setEmail}
              isErrorVisible={true}
              errorMessage={errorEmail}
              handleOnBlur={handleOnBlurEmail}
            />
            <Text type="description">
              {t('auth_email_sent.m_verif_email_sent')}
            </Text>

            <ButtonSend
              disabled={!isEmailValid}
              timerDisabled={false}
              onSubmit={onSendEmailVerificationCode}
              containerStyle={styles.btnContainerStyle}
            />
            {isCodeSend && (
              <Input
                label={t('common.m_code')}
                placeholder={t('common.enter_code')}
                value={emailVerificationCode}
                onChangeText={setEmailCode}
                maxLength={6}
                keyboardType="number-pad"
              />
            )}
          </View>
        </View>
        {isCodeSend && (
          <ButtonGradient
            disabled={!(emailVerificationCode.length === 6)}
            title={t('account.m_verif_email')}
            onPress={onVerificationEmail}
          />
        )}
      </KeyboardListener>
    </SafeContainer>
  );
}
