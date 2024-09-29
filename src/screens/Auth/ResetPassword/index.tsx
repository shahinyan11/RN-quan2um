import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import InputEmail from '@components/inputs/InputEmail';
import InputPhone, {IPhone} from '@components/inputs/InputPhone';
import ModalTFA from '@components/modals/ModalTFA';

import {ResetPasswordProps} from '@navigation/config/types';

import {emailValid, phoneValid} from '@utils/validation';
import {onRecoveryPassword, selectLoading} from '@store/auth';

import styles from './styles';
import KeyboardListener from '@components/listeners/KeyboardListener';

export default function ResetPassword({navigation}: ResetPasswordProps) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState({
    code: '380',
    phone: '',
    countryId: 231,
  } as IPhone);
  const [isValid, setValid] = useState(false);
  const [errorEmail, setErrorEmail] = useState(' ');
  const [errorPhone, setErrorPhone] = useState(' ');
  const [isPhoneSelected, setIsPhoneSelected] = useState(false);

  const onChangeFirstField = () => setIsPhoneSelected(!isPhoneSelected);

  const onSuccess = useCallback(() => {
    setModalVisible(false);
    navigation.navigate('RPVerification', {
      isPhoneSelected,
      value: isPhoneSelected ? `${phone.code}${phone.phone}` : email,
    });
  }, [navigation, email, isPhoneSelected, phone.code, phone.phone]);

  const onSend = () => {
    dispatch(
      onRecoveryPassword({
        data: {
          email: isPhoneSelected ? undefined : email,
          phone: isPhoneSelected ? `${phone.code}${phone.phone}` : undefined,
          is_mobile: 1,
        },
        onActionTFA: () => setModalVisible(true),
        onSuccess,
      }),
    );
  };

  const onSubmit = useCallback(
    (tfa_code: string) => {
      dispatch(
        onRecoveryPassword({
          data: {
            email: isPhoneSelected ? undefined : email,
            phone: isPhoneSelected ? `${phone.code}${phone.phone}` : undefined,
            is_mobile: 1,
            tfa_code,
          },
          onActionTFA: () => setModalVisible(true),
          onSuccess,
        }),
      );
    },
    [dispatch, email, phone, isPhoneSelected, onSuccess],
  );

  useEffect(() => {
    if (isPhoneSelected) {
      setValid(phoneValid({code: phone.code, phone: phone.phone}));
    } else {
      setValid(emailValid(email));
    }
  }, [email, isPhoneSelected, phone.code, phone.phone]);

  const handleOnBlurEmail = () => {
    const valid = emailValid(email);
    if (valid) {
      setErrorEmail(' ');
    } else {
      setErrorEmail(t('validation.m_wrong-email'));
    }
  };

  const handleOnBlurPhone = () => {
    const valid = phoneValid(phone);
    if (valid) {
      setErrorPhone(' ');
    } else {
      setErrorPhone(t('validation.m_wrong-phone'));
    }
  };

  return (
    <SafeContainer loading={loading}>
      <KeyboardListener>
        <View style={styles.containerStyle}>
          <Text type="t4" style={styles.pass}>
            {t('recovery_pass.recovery_password')}
          </Text>

          {isPhoneSelected ? (
            <InputPhone
              placeholder={t('registration.button_enter_phone')}
              label={t('input.label_phone')}
              withAction
              actionLabel={t('common.email')}
              onPressAction={onChangeFirstField}
              value={phone}
              onChangeText={setPhone}
              isErrorVisible={true}
              errorMessage={errorPhone}
              handleOnBlur={handleOnBlurPhone}
            />
          ) : (
            <InputEmail
              placeholder={t('input.place_enter_email')}
              label={t('input.label_email')}
              withAction
              actionLabel={t('common.phone')}
              onPressAction={onChangeFirstField}
              value={email}
              onChangeText={setEmail}
              isErrorVisible={true}
              errorMessage={errorEmail}
              handleOnBlur={handleOnBlurEmail}
            />
          )}
        </View>

        <ButtonGradient
          disabled={!isValid}
          title={t('common.send')}
          onPress={onSend}
        />
      </KeyboardListener>

      <ModalTFA
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={onSubmit}
      />
    </SafeContainer>
  );
}
