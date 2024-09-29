import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import KeyboardListener from '@components/listeners/KeyboardListener';
import ButtonSend from '@components/buttons/ButtonSend';
import Input from '@components/inputs/Input';
import ButtonGradient from '@components/buttons/ButtonGradient';

import styles from './styles';

import {
  onRecoveryPasswordCheckCode,
  onRecoveryPasswordResend,
} from '@store/auth/actions';

import {selectLoading} from '@store/auth';
import {ResetPasswordVerificationProps} from '@navigation/config/types';

export default function Verification({
  navigation,
  route,
}: ResetPasswordVerificationProps) {
  const {value, isPhoneSelected} = route.params;

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const [code, setCode] = useState('');

  const onSend = () => {
    dispatch(
      onRecoveryPasswordResend({
        email: isPhoneSelected ? undefined : value,
        phone: isPhoneSelected ? value : undefined,
      }),
    );
  };

  const onSuccess = () => {
    navigation.navigate('RPEnterPassword', {
      isPhoneSelected,
      code,
      value,
    });
  };

  const onSubmit = () => {
    dispatch(
      onRecoveryPasswordCheckCode({
        data: {
          code,
          email: isPhoneSelected ? undefined : value,
          phone: isPhoneSelected ? value : undefined,
        },
        onSuccess,
      }),
    );
  };

  return (
    <SafeContainer loading={loading}>
      <KeyboardListener containerStyle={styles.sfContainerStyle}>
        <View>
          <Text type="t4">{t('header.verification')}</Text>
          <Text type="description" style={styles.verificationMessageStyle}>
            {isPhoneSelected
              ? t('additional_fields.m_sent-phone-code')
              : t('additional_fields.code_desc')}
          </Text>
          <Text type="description" style={styles.valueStyle}>
            {value}
          </Text>

          <ButtonSend onSubmit={onSend} />

          <Input
            secureTextEntry={true}
            label={t('common.enter_code')}
            placeholder={t('common.enter_code')}
            containerStyle={styles.inpContainerStyle}
            keyboardType="number-pad"
            value={code}
            textContentType="oneTimeCode"
            maxLength={6}
            onChangeText={setCode}
          />
        </View>

        <ButtonGradient
          disabled={!(code.length === 6)}
          title={t('common.send')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
