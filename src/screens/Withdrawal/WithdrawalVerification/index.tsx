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
import {selectUser} from '@store/auth';
import {WithdrawalVerificationProps} from '@navigation/config/types';
import {
  clearWallet,
  clearWithdrawalForm,
  onResendWithdrawalCode,
  onWithdrawalConfirm,
} from '@store/account';
import ModalTFA from '@components/modals/ModalTFA';

export default function WithdrawalVerification({
  navigation,
}: WithdrawalVerificationProps) {
  const {t} = useTranslation();
  const {email} = useSelector(selectUser);
  const [tfaVisible, setTfaVisible] = useState(false);
  const dispatch = useDispatch();

  const [code, setCode] = useState('');

  const onSend = () => {
    dispatch(onResendWithdrawalCode());
  };

  const onSuccess = () => {
    dispatch(clearWithdrawalForm());
    dispatch(clearWallet());
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Withdrawal',
        },
      ],
    });
  };

  const onSubmit = (tfa_code: string) => {
    dispatch(onWithdrawalConfirm({tfa_code, token: code}, onSuccess));
  };

  return (
    <SafeContainer>
      <KeyboardListener containerStyle={styles.sfContainerStyle}>
        <View>
          <Text type="t4">{t('header.verification')}</Text>
          <Text type="description" style={styles.verificationMessageStyle}>
            {t('common.m_confirm_mail_hint')}{' '}
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
          title={t('common.send')}
          onPress={() => setTfaVisible(true)}
        />

        <ModalTFA
          visible={tfaVisible}
          onClose={() => setTfaVisible(false)}
          onSubmit={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
