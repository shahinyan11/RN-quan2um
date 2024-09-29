import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import ContainerItem from '@components/containers/ContainerItem';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import KeyboardListener from '@components/listeners/KeyboardListener';
import Input from '@components/inputs/Input';
import ButtonSend from '@components/buttons/ButtonSend';

import styles from './styles';

import {onAccountDeactivate} from '@store/account/actions';
import {selectUser} from '@store/auth';

export default function AccountDeactivation({
  navigation,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {phone} = useSelector(selectUser);
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneCode, setPhoneCode] = useState('');

  const onSuccess = () => {
    if (phoneCode) {
      navigation.goBack();
      return;
    }
    setIsCodeSend(true);
  };

  const onResendCode = () => {
    dispatch(onAccountDeactivate({password}, onSuccess));
  };

  const onSubmit = () => {
    dispatch(onAccountDeactivate({password, phone_code: phoneCode}, onSuccess));
  };

  const onConnectPhone = () => navigation.navigate('AccountConnectPhone');

  if (!phone) {
    return (
      <SafeContainer containerStyle={styles.screenContainerStyle}>
        <Text type="t4" textAlign="center">
          {t('common.m_alert_title')}
        </Text>
        <Text
          type="description"
          textAlign="center"
          style={styles.subtitleStyle}>
          {t('common.m_deactivate_hint')}
        </Text>

        <ButtonGradient
          title={t('common.add_phone')}
          onPress={onConnectPhone}
        />
      </SafeContainer>
    );
  }

  return (
    <SafeContainer>
      <KeyboardListener>
        <View style={styles.mainContainerStyle}>
          <Input
            label={t('input.label_password')}
            placeholder={t('input.label_current_password')}
            containerStyle={styles.inpContainerStyle}
            value={password}
            onChangeText={setPassword}
          />

          {isCodeSend && (
            <>
              <Input
                label={t('common.m_code')}
                placeholder={t('common.enter_code')}
                keyboardType="number-pad"
                containerStyle={styles.inpContainerStyle}
                value={phoneCode}
                onChangeText={setPhoneCode}
              />
              <ButtonSend
                disabled={!password}
                timerDisabled={true}
                onSubmit={onResendCode}
              />
            </>
          )}
        </View>
        <ContainerItem>
          <Text type="t6" style={styles.titleStyle}>
            {t('deactivate_account.modal_confirm_description')}
          </Text>
        </ContainerItem>

        <ButtonGradient title={t('common.deactivate')} onPress={onSubmit} />
      </KeyboardListener>
    </SafeContainer>
  );
}
