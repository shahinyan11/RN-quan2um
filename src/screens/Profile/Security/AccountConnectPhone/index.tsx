import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import KeyboardListener from '@components/listeners/KeyboardListener';
import InputPhone, {IPhone} from '@components/inputs/InputPhone';

import {onUpdatePhone} from '@store/account';
import {selectLoading} from '@store/account/selectors';

import styles from './styles';
import {phoneValid} from '@utils/validation';

export default function AccountConnectPhone({
  navigation,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const [phone, setPhone] = useState({} as IPhone);
  const [isValid, setValid] = useState(false);
  const [errorPhone, setErrorPhone] = useState(' ');
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const onSuccess = () => {
    navigation.navigate('VerificationPhone', {
      phone: `${phone.code}${phone.phone}`,
      countryId: phone.countryId,
    });
  };

  const onSubmit = () => {
    dispatch(
      onUpdatePhone({
        data: {
          country_id: phone.countryId,
          phone: `${phone.code}${phone.phone}`,
        },
        onSuccess,
      }),
    );
  };

  useEffect(() => {
    if (phone.phone) {
      setValid(phoneValid(phone));
    }
  }, [phone]);

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
        <View style={styles.mainContainerStyle}>
          <Text type="t4" style={styles.titleStyle}>
            {t('common.add_phone')}
          </Text>

          <Text type="description">{t('common.m_add_phone_login_desc')}</Text>

          <InputPhone
            label={t('input.label_phone')}
            placeholder={t('registration.button_enter_phone')}
            value={phone}
            onChangeText={setPhone}
            containerStyle={styles.inpContainerStyle}
            isErrorVisible={true}
            errorMessage={errorPhone}
            handleOnBlur={handleOnBlurPhone}
          />
        </View>
        <ButtonGradient
          disabled={!isValid}
          title={t('common.next_step')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
