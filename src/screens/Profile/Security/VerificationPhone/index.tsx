import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import KeyboardListener from '@components/listeners/KeyboardListener';
import ButtonSend from '@components/buttons/ButtonSend';
import Input from '@components/inputs/Input';
import ButtonGradient from '@components/buttons/ButtonGradient';

import {stylesGlobal} from '@constants/globalStyles';
import {onUpdatePhone} from '@store/account/actions';
import {selectLoading} from '@store/account/selectors';

import {onSuccessMessage} from '@store/app/actions';

import styles from './styles';

export default function VerificationPhone({
  route,
  navigation,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {phone, countryId} = route.params;
  const [code, setCode] = useState('');

  const loading = useSelector(selectLoading);

  const onSend = () => {
    dispatch(
      onUpdatePhone({
        data: {
          country_id: countryId,
          phone: phone,
        },
      }),
    );
  };

  const onSuccess = () => {
    dispatch(
      onSuccessMessage(
        'Congratulation, you successful connect phone number to your account',
      ),
    );
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Security',
        },
      ],
    });
  };

  const onSubmit = () => {
    dispatch(
      onUpdatePhone({
        data: {
          country_id: countryId,
          phone: phone,
          phone_code: code,
        },
        onSuccess,
      }),
    );
  };

  return (
    <SafeContainer loading={loading}>
      <KeyboardListener>
        <View style={stylesGlobal.flexOne}>
          <Text type="t4" style={styles.titleStyle}>
            {t('header.verification')}
          </Text>
          <Text type="description">
            {t('auth_email_sent.m_verif_phone_sent')}
            <Text type="description" style={styles.valueStyle}>
              {`+${phone}`}
            </Text>
          </Text>

          <ButtonSend
            timerDisabled={true}
            onSubmit={onSend}
            containerStyle={styles.btnContainerStyle}
          />

          <Input
            label={t('common.m_code')}
            placeholder={t('common.enter_code')}
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
