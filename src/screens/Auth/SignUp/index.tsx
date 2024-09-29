import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Text from '@components/textes/Text';
import SafeContainer from '@components/containers/SafeContainer';
import InputEmail from '@components/inputs/InputEmail';
import InputPassword from '@components/inputs/InputPassword';
import ButtonGradient from '@components/buttons/ButtonGradient';
import CheckBox from '@components/checkboxes/CheckBox';
import Row from '@components/containers/Row';
import KeyboardListener from '@components/listeners/KeyboardListener';
import InputCountry, {
  ICountryPickerCountry,
} from '@components/inputs/InputCountry';

import {SUProps} from '@navigation/config/types';

import {onSignUp} from '@store/auth';
import {emailValid, passwordValid} from '@utils/validation';

import styles from './styles';
import ModalCaptcha from '@components/modals/ModalCaptcha/ModalCaptcha';
import Icon from '@components/icons/Icon';
import ModalTermsConditions from '@components/modals/ModalTermsConditions/ModalTermsConditions';

function SignUp({navigation}: SUProps) {
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [isAcceptTerms, setIsAcceptTerms] = useState(false);
  const [isValid, setValid] = useState(false);
  const [country, setCountry] = useState({} as ICountryPickerCountry);
  const [modalVisible, setModalVisible] = useState(false);
  const [gRecaptcha, setGRecaptcha] = useState('');
  const [isVisibleTerms, setIsVisibleTerms] = useState(false);
  const [errorEmail, setErrorEmail] = useState(' ');
  const [errorPass, setErrorPass] = useState(' ');

  const primaryMain = EStyleSheet.value('$primaryMain');

  const onSuccess = () => {
    navigation.navigate('SUVerificationEmail', {
      email,
    });
  };

  const onSubmit = (captcha: string = '') => {
    dispatch(
      onSignUp(
        {
          app: 'app',
          email,
          password,
          confirm: 1,
          confirm_password: 1,
          country_id: country.id,
          'g-recaptcha-response': gRecaptcha || captcha,
        },
        onSuccess,
      ),
    );
  };

  const onChangeAcceptRules = () => setIsAcceptTerms(!isAcceptTerms);

  useEffect(() => {
    const isEmailValid = emailValid(email);

    const isPasswordValid =
      passwordValid(password) && password === secondPassword;

    setValid(isEmailValid && isPasswordValid && isAcceptTerms && !!country?.id);
  }, [password, secondPassword, email, isAcceptTerms, country?.id]);

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
          setModalVisible(false);
          onSubmit(eventCaptcha);
        }, 0);
      }
    }
  };

  const onShow = () => {
    setModalVisible(true);
  };

  const onConfirm = () => {
    setIsAcceptTerms(true);
  };

  const openModalTerms = () => {
    setIsVisibleTerms(true);
  };

  const handleOnBlurEmail = () => {
    const valid = emailValid(email);
    if (valid) {
      setErrorEmail(' ');
    } else {
      setErrorEmail(t('validation.m_wrong-email'));
    }
  };

  const handleOnBlurPass = () => {
    const valid = password.length >= 8;
    if (valid) {
      setErrorPass(' ');
    } else {
      setErrorPass(t('common.m_pass-length'));
    }
  };

  return (
    <SafeContainer>
      <KeyboardListener containerStyle={styles.sfContainerStyle}>
        <View style={styles.sfContainerStyle}>
          <InputEmail
            placeholder={t('input.place_enter_email')}
            label={t('input.label_email')}
            value={email}
            onChangeText={setEmail}
            containerStyle={styles.inpContainerStyle}
            isErrorVisible={true}
            errorMessage={errorEmail}
            handleOnBlur={handleOnBlurEmail}
          />
          <InputCountry
            onChange={setCountry}
            containerStyle={styles.inpContainerStyle}
            countryId={231}
          />
          <InputPassword
            label={t('input.label_password')}
            placeholder={t('input.label_password')}
            value={password}
            onChangeText={setPassword}
            containerStyle={styles.inpContainerStyle}
            errorMessage={errorPass}
            isErrorVisible={true}
            handleOnBlur={handleOnBlurPass}
          />
          <InputPassword
            label={t('input.label_repeat_password')}
            placeholder={t('input.label_repeat_password')}
            value={secondPassword}
            onChangeText={setSecondPassword}
            containerStyle={styles.inpContainerStyle}
          />
        </View>

        <View>
          <Row containerStyle={styles.checkBoxContainerStyle}>
            <CheckBox isActive={isAcceptTerms} onPress={onChangeAcceptRules} />

            <Row containerStyle={styles.termsStyle}>
              <Text type="textSmall">
                {t('terms.m_terms')} {t('terms.terms_conditions')}
              </Text>
            </Row>
            <Icon
              disabled={false}
              name="info"
              size={40}
              onPress={openModalTerms}
              color={primaryMain}
            />
          </Row>

          <ButtonGradient
            disabled={!isValid}
            title={t('common.next_step')}
            onPress={onShow}
          />
        </View>
        <ModalCaptcha isVisible={modalVisible} onMessage={onMessage} />
        <ModalTermsConditions
          isVisible={isVisibleTerms}
          hideModal={setIsVisibleTerms}
          onConfirm={onConfirm}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}

export default SignUp;
