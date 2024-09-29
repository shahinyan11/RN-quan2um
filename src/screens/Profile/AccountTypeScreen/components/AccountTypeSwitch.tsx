import React, {useState} from 'react';
import ButtonGradient from '@components/buttons/ButtonGradient';
import Row from '@components/containers/Row';
import {useSelector} from 'react-redux';
import {selectUser} from '@store/auth';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ModalCustom from '@components/modals/ModalCustom';
import Text from '@components/textes/Text';
import {useTranslation} from 'react-i18next';
import ButtonLink from '@components/buttons/ButtonLink';
import {useNavigation} from '@react-navigation/native';

/**
 * Account type switcher personal to business
 */
const AccountTypeSwitch = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {account_type, is_verified} = useSelector(selectUser);
  const disabledColor = EStyleSheet.value('$white5');
  const disabledTitleColor = EStyleSheet.value('$white25');
  const disabledGradientColors = [disabledColor, disabledColor];
  const gradientColorsPressed = [disabledTitleColor, disabledTitleColor];
  const [visibleVerified, setVisibleVerified] = useState(false);

  const pressBusinessAcc = () => {
    if (!is_verified) {
      setVisibleVerified(true);
    }
  };

  const navigateVerify = () => {
    navigation.navigate('VerificationProfile');
    setVisibleVerified(false);
  };
  return (
    <Row justifyContent="space-between">
      <ButtonGradient
        title={t('account.account_personal')}
        containerStyle={styles.buttonContainer}
        disabled={account_type !== 1}
        onPress={() => {}}
      />
      <ButtonGradient
        title={t('account.account_business')}
        disabled={false}
        containerStyle={styles.buttonContainer}
        gradientColors={account_type !== 2 ? disabledGradientColors : undefined}
        gradientColorsPressed={
          account_type !== 2 ? gradientColorsPressed : undefined
        }
        onPress={pressBusinessAcc}
      />
      <ModalCustom
        visible={visibleVerified}
        onClose={() => setVisibleVerified(false)}>
        <View style={styles.modalContainer}>
          <Text type="t4" textAlign="center">
            {t('common.m_verify-account')}
          </Text>
          <ButtonLink
            onPress={navigateVerify}
            containerStyle={styles.verifyButton}
            title={t('verify_user.m_verify')}
          />
        </View>
      </ModalCustom>
    </Row>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    paddingVertical: 20,
  },
  verifyButton: {
    marginTop: 30,
  },
  buttonContainer: {
    width: '48%',
  },
});

export default AccountTypeSwitch;
