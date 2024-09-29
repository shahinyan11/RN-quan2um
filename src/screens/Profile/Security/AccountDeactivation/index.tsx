import React, {useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import ContainerItem from '@components/containers/ContainerItem';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';

import {onAccountDeactivate} from '@store/account/actions';
import {onLogout} from '@store/auth';

export default function AccountDeactivation({
  navigation,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isCodeSend, setIsCodeSend] = useState(false);
  const [sendDisabled, setSendDisabled] = useState(false);
  const [code, setCode] = useState('');

  const onSuccess = () => {
    // if (code) {
    dispatch(onLogout());
    // return;
    // }

    // setIsCodeSend(true);

    // setTimeout(() => {
    //   setSendDisabled(false);
    // }, 120 * 1000);
  };

  const onSendCode = () => {
    dispatch(onAccountDeactivate({onSuccess}));
    setSendDisabled(true);
  };

  const onSubmit = () => {
    dispatch(
      onAccountDeactivate({
        // config: {mail_code: code},
        onSuccess,
      }),
    );
  };

  return (
    <SafeContainer>
      <KeyboardListener>
        <View style={styles.mainContainerStyle}>
          {/*<Input*/}
          {/*  label={t('common.m_code')}*/}
          {/*  placeholder={t('common.enter_code')}*/}
          {/*  keyboardType="number-pad"*/}
          {/*  containerStyle={styles.inpContainerStyle}*/}
          {/*  value={code}*/}
          {/*  onChangeText={setCode}*/}
          {/*/>*/}
          {/*<ButtonSend*/}
          {/*  disabled={sendDisabled}*/}
          {/*  timerDisabled={isCodeSend}*/}
          {/*  onSubmit={onSendCode}*/}
          {/*/>*/}
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
