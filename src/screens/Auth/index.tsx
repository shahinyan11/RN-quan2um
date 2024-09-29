import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';

import ButtonGradient from '@components/buttons/ButtonGradient';
import ModalTFA from '@components/modals/ModalTFA';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import Link from '@components/textes/Link';
import Icon from '@components/icons/Icon';
import AbstractLines from '@assets/images/AbstractLines';

import styles from './styles';
import {
  checkSocialRegister,
  onSignInSocial,
  selectLoading,
  selectSocialRegister,
} from '@store/auth';
import ModalTermsConditions from '@components/modals/ModalTermsConditions/ModalTermsConditions';
import {getRegisterList} from '@store/pages';
import Button from '@components/buttons/Button';

GoogleSignin.configure({
  webClientId:
    Platform.OS === 'ios'
      ? Config.IOS_GOOGLE_WEB_CLIENT
      : Config.GOOGLE_WEB_CLIENT,
});

export default function Auth({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const socialRegister = useSelector(selectSocialRegister);

  const [selectedSocial, setSelectedSocial] = useState(
    'gmail' as 'gmail' | 'apple',
  );
  const [isVisibleTerms, setIsVisibleTerms] = useState(false);
  const [isModalTfaVisible, setModalTfaVisible] = useState(false);
  const [socialToken, setSocialToken] = useState(null as null | string);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    dispatch(getRegisterList());
  }, []);

  const onChangeModalTfaVisible = useCallback(() => {
    setModalTfaVisible(!isModalTfaVisible);
  }, [isModalTfaVisible]);

  useEffect(() => {
    if (socialRegister && userInfo) {
      if (socialRegister.exist) {
        onConfirm();
      } else {
        setIsVisibleTerms(true);
      }
    }
  }, [socialRegister]);

  const onSocialLogout = useCallback(async () => {
    try {
      if (selectedSocial === 'gmail') {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      }
    } catch (e) {
      console.log('[Error]: Error social logout');
    }
  }, [selectedSocial]);

  const onCancelLogin = () => {
    onSocialLogout().then();
    setModalTfaVisible(false);
  };

  const onSignUp = () => {
    navigation.navigate('SignUp');
  };
  const onSignIn = () => {
    navigation.navigate('SignIn');
  };

  const onConfirm = () => {
    dispatch(
      onSignInSocial({social: 'gmail', token: userInfo.idToken}, () => {
        setSocialToken(userInfo.idToken);
        onChangeModalTfaVisible();
      }),
    );
  };

  const onGoogleSignIn = async () => {
    setSelectedSocial('gmail');

    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);
      setSocialToken(user.idToken);
      dispatch(checkSocialRegister({email: user.user.email, social: 'gmail'}));
    } catch (error) {
      console.log('Google SignIn Error', error);
    }
  };

  const onAppleSignIn = async () => {
    try {
      setSelectedSocial('apple');

      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL],
      });

      const authStatus = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (authStatus === appleAuth.State.AUTHORIZED) {
        dispatch(
          onSignInSocial(
            {
              social: 'apple',
              token: appleAuthRequestResponse.identityToken,
            },
            () => {
              setSocialToken(appleAuthRequestResponse.identityToken);
              onChangeModalTfaVisible();
            },
          ),
        );
      }
    } catch (e) {
      console.log('Apple SignIn Error', e);
    }
  };

  const onConfirmSocialLogin = useCallback(
    (tfa_code: string) => {
      dispatch(
        onSignInSocial({
          social: selectedSocial,
          token: socialToken,
          tfa_code,
        }),
      );
    },
    [socialToken, selectedSocial, userInfo],
  );

  return (
    <SafeContainer loading={loading} containerStyle={styles.sfContainerStyle}>
      <AbstractLines />
      <View style={styles.topContainerStyle}>
        <Icon name="logo" size={152} />
        <Text type="t1" style={styles.titleStyle}>
          {t('common.m_welcome')}
        </Text>
        <Text type="textMiddle">{t('common.m_welcome_description')}</Text>
      </View>
      <View>
        {Platform.OS === 'ios' && (
          <Button
            title={t('auth.m_signin-apple')}
            onPress={onAppleSignIn}
            icon={{name: 'apple', size: 40, color: 'black'}}
            withIcon={true}
            buttonContainerStyle={styles.socialButton}
            titleStyle={styles.title}
          />
        )}
        <Button
          title={t('auth.m_signin-google')}
          onPress={onGoogleSignIn}
          icon={{name: 'google', size: 40, color: 'black'}}
          withIcon={true}
          buttonContainerStyle={styles.socialButton}
          titleStyle={styles.title}
        />
        <ButtonGradient
          title={t('registration.button_create')}
          onPress={onSignUp}
          containerStyle={styles.btnContainerStyle}
        />
        <Text type="textMiddle" textAlign="center">
          {t('registration.already_registered')}{' '}
          <Link title={t('auth.signin')} onPress={onSignIn} />
        </Text>
      </View>

      <ModalTFA
        visible={isModalTfaVisible}
        onSubmit={onConfirmSocialLogin}
        onClose={onCancelLogin}
      />
      <ModalTermsConditions
        isVisible={isVisibleTerms}
        hideModal={setIsVisibleTerms}
        onConfirm={onConfirm}
      />
    </SafeContainer>
  );
}
