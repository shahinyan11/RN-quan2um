import React from 'react';
import Row from '@components/containers/Row';
import styles from '@screens/Withdrawal/Crypto/styles';
import Text from '@components/textes/Text';
import ButtonGradient from '@components/buttons/ButtonGradient';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

/**
 * Info panel of balance and fee
 * @param {object} walletData
 * @param {boolean} isValid
 * @param {number} commission
 * @param {function} onConfirm
 */
const InfoBalanceFee = ({walletData, isValid, commission, onConfirm}: any) => {
  const {t} = useTranslation();

  return (
    <View>
      <Row
        justifyContent="space-between"
        containerStyle={styles.infoContainerStyle}>
        <Text type="textSmall" style={styles.commissionStyle}>
          {t('common.balance')}:
        </Text>
        <Text type="textSmall">
          {walletData.balance_face} {walletData.currency.code}
        </Text>
      </Row>
      <Row justifyContent="space-between">
        <Text type="textSmall" style={styles.commissionStyle}>
          {`${t('common.fee')}:`}
        </Text>
        <Text type="textSmall">
          {`${commission} ${walletData.currency.code}`}
        </Text>
      </Row>
      <ButtonGradient
        disabled={!isValid}
        title={t('common.next_step')}
        onPress={onConfirm}
      />
    </View>
  );
};

export default InfoBalanceFee;
