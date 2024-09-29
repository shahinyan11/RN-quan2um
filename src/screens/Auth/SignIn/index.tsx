import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import ButtonGradient from '@components/buttons/ButtonGradient';
import InputPassword from '@components/inputs/InputPassword';
import InputEmail from '@components/inputs/InputEmail';
import SafeContainer from '@components/containers/SafeContainer';
import InputPhone from '@components/inputs/InputPhone';
import KeyboardListener from '@components/listeners/KeyboardListener';
import ModalTFA from '@components/modals/ModalTFA';

import styles from './styles';
import {emailValid, passwordValid, phoneValid} from '@utils/validation';

import {SIProps} from '@navigation/config/types';
import {onSignIn, selectLoading} from '@store/auth';
import ModalCaptcha from '@components/modals/ModalCaptcha/ModalCaptcha';

export default function SignIn({navigation}: SIProps) {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState({
    code: '',
    phone: '',
    countryId: 2,
  });
  const [password, setPassword] = useState('');
  const [isPhoneSelected, setSelectedPhone] = useState(false);
  const [gRecaptcha, setGRecaptcha] = useState('');

  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const [tfaVisible, setTFAVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorEmail, setErrorEmail] = useState(' ');
  const [errorPhone, setErrorPhone] = useState(' ');

  const username = isPhoneSelected ? `${phone.code}${phone.phone}` : email;

  const onChangeTFAVisible = useCallback(
    () => setTFAVisible(!tfaVisible),
    [tfaVisible],
  );

  const onSubmit = useCallback(
    (tfa_code: string = '', captcha: string = '') => {
      const params = {
        app: 'app',
        username,
        password,
        'g-recaptcha-response': gRecaptcha || captcha,
      };
      if (tfa_code) {
        params.tfa_code = tfa_code;
      }
      dispatch(onSignIn(params, onChangeTFAVisible));
    },
    [onChangeTFAVisible, password, username, gRecaptcha],
  );

  const onForgetPassword = () => {
    navigation.navigate('RPResetPassword');
  };

  const onChangeFirstField = () => {
    setSelectedPhone(!isPhoneSelected);
  };

  useEffect(() => {
    if (isPhoneSelected) {
      setIsValid(passwordValid(password) && phoneValid(phone));
    } else {
      setIsValid(emailValid(email) && passwordValid(password));
    }
  }, [isPhoneSelected, phone, email, password]);

  const onMessage = (event: any) => {
    if (event && event.nativeEvent.data) {
      let eventCaptcha = event.nativeEvent.data;
      if (['cancel', 'error', 'expired'].includes(eventCaptcha)) {
        setModalVisible(false);
        return;
      } else {
        setGRecaptcha(eventCaptcha);
        setModalVisible(false);
        setTimeout(() => {
          onSubmit('', eventCaptcha);
          setModalVisible(false);
        }, 500);
      }
    }
  };

  const onShow = () => {
    setModalVisible(true);
  };

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
    <SafeContainer loading={isLoading}>
      <KeyboardListener containerStyle={styles.sfContainerStyle}>
        <View>
          {isPhoneSelected ? (
            <InputPhone
              placeholder={t('registration.button_enter_phone')}
              label={t('common.phone')}
              withAction
              actionLabel={t('common.email')}
              onPressAction={onChangeFirstField}
              value={phone}
              onChangeText={setPhone}
              containerStyle={styles.inpContainerStyle}
              isErrorVisible={true}
              errorMessage={errorPhone}
              handleOnBlur={handleOnBlurPhone}
            />
          ) : (
            <InputEmail
              placeholder={t('auth.enter_your_mail')}
              label={t('common.email')}
              withAction
              actionLabel={t('common.phone')}
              onPressAction={onChangeFirstField}
              value={email}
              onChangeText={setEmail}
              containerStyle={styles.inpContainerStyle}
              isErrorVisible={true}
              errorMessage={errorEmail}
              handleOnBlur={handleOnBlurEmail}
            />
          )}
          <InputPassword
            withPasswordLevel={false}
            placeholder={t('input.label_password')}
            label={t('input.label_password')}
            withAction
            actionLabel={t('auth.button_forgot_password')}
            onPressAction={onForgetPassword}
            value={password}
            onChangeText={setPassword}
            containerStyle={styles.inpContainerStyle}
          />
        </View>
        <ButtonGradient
          disabled={!isValid}
          title={t('auth.enter')}
          onPress={onShow}
        />
      </KeyboardListener>
      <ModalTFA
        visible={tfaVisible}
        onClose={onChangeTFAVisible}
        onSubmit={onSubmit}
      />
      <ModalCaptcha isVisible={modalVisible} onMessage={onMessage} />
    </SafeContainer>
  );
}
