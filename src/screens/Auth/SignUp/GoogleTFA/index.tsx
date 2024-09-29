import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Linking, Platform, View} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {StackScreenProps} from '@react-navigation/stack';

import ContainerItem from '@components/containers/ContainerItem';
import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import Text from '@components/textes/Text';
import Link from '@components/textes/Link';

import styles from './styles';
import useFetch from '@hooks/useFetch';

import {ACCOUNT_TFA} from '@api';
import {appleStore, googleStore} from '@constants/images';
import {useDispatch} from 'react-redux';
import {onSuccessMessage, setTfaSkipped} from '@store/app';

type TFA = {
  secret: string;
  gr_code: string;
};

export default function GTFACode({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {response, isLoading, error} = useFetch<TFA>({url: ACCOUNT_TFA});

  if (error) {
    // dispatch(onActionLogout());
  }

  const onSubmit = () => {
    navigation.navigate('GTFAEnterCode', {
      secret: response?.secret,
    });
  };

  const onPressGoogle = () => {
    Linking.openURL(
      'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=ru&gl=US',
    );
  };

  const onPressApple = () => {
    Linking.openURL(
      'https://apps.apple.com/ru/app/google-authenticator/id388497605',
    );
  };

  const onCopy = () => {
    try {
      Clipboard.setString(response?.secret);
      dispatch(onSuccessMessage(t('common.copy_clipboard')));
    } catch (e) {}
  };

  const handleSkip = () => {
    dispatch(setTfaSkipped(true));
    navigation.navigate('Main');
  };

  return (
    <SafeContainer loading={isLoading} containerStyle={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <View>
          <Text type="btnRegular" textAlign="center" style={styles.titleStyle}>
            {t('tfa_on_off.info_desc')}
          </Text>

          {Platform.OS === 'ios' ? (
            <ContainerItem
              disabled={false}
              containerStyle={styles.itemContainerStyle}
              onPress={onPressApple}>
              <Image
                source={appleStore}
                style={styles.imageContainerStyle}
                resizeMode="contain"
              />
            </ContainerItem>
          ) : (
            <ContainerItem
              disabled={false}
              containerStyle={styles.itemContainerStyle}
              onPress={onPressGoogle}>
              <Image
                source={googleStore}
                style={styles.imageContainerStyle}
                resizeMode="contain"
              />
            </ContainerItem>
          )}
        </View>

        <View style={{alignItems: 'center'}}>
          <Image
            style={{width: 150, height: 150}}
            source={{uri: response?.gr_code}}
          />
        </View>

        <View>
          <Text type="btnRegular" textAlign="center" style={styles.titleStyle}>
            {t('tfa_on_off.qr_tip')}
          </Text>

          <ContainerItem containerStyle={styles.itemContainerStyle}>
            <Text type="t6" textAlign="center">
              {t('common.m_ga-code')}
            </Text>
            <Text type="btnSmall" style={styles.secretStyle}>
              {response?.secret}
            </Text>
            <Link type="btnMini" title={t('common.copy')} onPress={onCopy} />
          </ContainerItem>
        </View>
      </View>

      <Button title={t('common.skip')} onPress={handleSkip} />
      <Button title={t('common.next_step')} onPress={onSubmit} />
    </SafeContainer>
  );
}
