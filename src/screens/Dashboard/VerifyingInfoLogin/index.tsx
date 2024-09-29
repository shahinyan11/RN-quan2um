import React from 'react';
import {View} from 'react-native';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/textes/Text';
import styles from './styles';
import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '@components/buttons/Button';

/**
 * Screen to verify login from web-client
 * @param {object} navigation
 * @param {object} route
 */
const VerifyingInfoLogin = ({navigation, route}: any) => {
  const {t} = useTranslation();
  const white50 = EStyleSheet.value('$white50');

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.navigate('Dashboard');
  };

  const handleLogin = () => {
    // todo add api request
  };

  return (
    <SafeContainer containerStyle={styles.containerStyle}>
      <Row containerStyle={styles.navBar}>
        <Icon
          name="arrow-left"
          size={20}
          color={white50}
          onPress={handleGoBack}
          disabled={false}
          containerStyle={styles.iconBackContainerStyle}
        />
        <Text type="t3">{t('verify_user.m_verify-login')}</Text>
      </Row>
      <Text style={styles.info}>{t('verify_user.m_confirm-info')}</Text>
      <View style={styles.wrapper}>
        <Row>
          <Text>todo data: </Text>
          <Text>{JSON.stringify(route.params.data, null, 2)}</Text>
        </Row>

        <View>
          <Button
            onPress={handleLogin}
            title={t('verify_user.m_verify-login')}
          />
          <Button
            type="cancel"
            onPress={handleCancel}
            title={t('common.cancel')}
          />
        </View>
      </View>
    </SafeContainer>
  );
};

export default VerifyingInfoLogin;
