import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import InputPassword from '@components/inputs/InputPassword';
import ButtonGradient from '@components/buttons/ButtonGradient';
import Text from '@components/textes/Text';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';
import {passwordValid} from '@utils/validation';

import {onRecoveryChangePassword} from '@store/auth';

import {ChangePasswordProps} from '@navigation/config/types';

export default function SUEnterPassword({route}: ChangePasswordProps) {
  const {code, isPhoneSelected, value} = route.params;
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isValid, setValid] = useState(false);

  const onSubmit = () => {
    dispatch(
      onRecoveryChangePassword({
        data: {
          code,
          new_password: password,
          confirm_password: password,
          email: isPhoneSelected ? undefined : value,
          phone: isPhoneSelected ? value : undefined,
        },
      }),
    );
  };

  useEffect(() => {
    setValid(passwordValid(password) && password === secondPassword);
  }, [password, secondPassword]);

  return (
    <SafeContainer>
      <KeyboardListener>
        <View style={styles.sfContainerStyle}>
          <Text type="t4">{t('input.label_new_password')}</Text>
          <InputPassword
            label={t('input.label_new_password')}
            placeholder={t('input.label_new_password')}
            containerStyle={styles.inpContainerStyle}
            value={password}
            onChangeText={setPassword}
          />
          <InputPassword
            label={t('input.label_repeat_new_password')}
            placeholder={t('input.label_repeat_new_password')}
            containerStyle={styles.inpContainerStyle}
            value={secondPassword}
            onChangeText={setSecondPassword}
          />
        </View>

        <ButtonGradient
          disabled={!isValid}
          title={t('common.send')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
