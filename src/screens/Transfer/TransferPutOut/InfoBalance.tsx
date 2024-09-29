import React from 'react';
import {useTranslation} from 'react-i18next';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import styles from '@screens/Transfer/TransferPutOut/styles';

/**
 * Info for balance and commission
 * @param {object} transferForm
 * @param {number} commission
 */
const InfoBalance = ({transferForm, commission}) => {
  const {t} = useTranslation();

  const balanceText = (() => {
    const {selectedCurrency} = transferForm;
    return selectedCurrency
      ? `${transferForm.selectedCurrency?.current_balance_face} ${transferForm.selectedCurrency?.code}`
      : '';
  })();

  const commissionText = (() => {
    return `${commission?.toFixed(8)} ${
      transferForm.selectedCurrency?.code || ''
    }`;
  })();

  return (
    <>
      <Row justifyContent="space-between">
        <Text type="textSmall" style={styles.labelStyle}>
          {t('common.balance')}:
        </Text>
        <Text type="textSmall" style={styles.infoContainerStyle}>
          {balanceText}
        </Text>
      </Row>
      <Row justifyContent="space-between">
        <Text type="textSmall" style={styles.labelStyle}>
          {t('common.m_fee', {
            value: transferForm.selectedCurrency?.transfer_fee,
          })}
        </Text>
        <Text type="textSmall">{commissionText}</Text>
      </Row>
    </>
  );
};

export default InfoBalance;
