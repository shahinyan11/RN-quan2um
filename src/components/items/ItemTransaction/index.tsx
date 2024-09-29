import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';

import {formatDate} from '@utils/fns';
import {ITransaction} from '@store/account/types';

import styles from './styles';

interface TransactionProps extends ITransaction {
  successColor: string;
  errorColor: string;
  alertColor: string;
}

const Transaction = ({
  status,
  status_name,
  amount_face,
  time,
  successColor,
  alertColor,
  errorColor,
  crypto_address,
  is_deposit,
  payment_system,
  currency,
}: TransactionProps) => {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const {t} = useTranslation();

  const statusColor = useCallback(
    () =>
      status === 'pending'
        ? alertColor
        : status === 'error' ||
          status === 'canceled' ||
          status === 'failed' ||
          status === 'rejected'
        ? errorColor
        : successColor,
    [status, alertColor, successColor, errorColor],
  );

  const onChangeInfoVisible = () => {
    setInfoVisible(!isInfoVisible);
  };

  return (
    <>
      <Row
        justifyContent="space-between"
        containerStyle={styles.itemContainerStyle}>
        <View style={styles.boxContainerStyle}>
          <Text>{amount_face}</Text>
        </View>
        <View style={styles.boxContainerStyle}>
          <Text textAlign="center" style={{color: statusColor()}}>
            {is_deposit ? t('common.deposit') : t('common.withdraw')}
          </Text>
        </View>
        <Row
          justifyContent="flex-end"
          containerStyle={styles.boxContainerStyle}>
          <Text textAlign="right">{formatDate(time, 'MM/yy; hh:mm')}</Text>
          <Icon
            disabled={false}
            onPress={onChangeInfoVisible}
            name={isInfoVisible ? 'arrow-up' : 'arrow-down'}
            containerStyle={styles.iconContainerStyle}
          />
        </Row>
      </Row>
      {isInfoVisible && (
        <>
          {currency.is_fiat && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.itemInfoContainerStyle}>
              <Text type="textMini" style={styles.labelStyle}>
                {t('common.type')}
              </Text>
              <Text type="textSmall">{payment_system}</Text>
            </Row>
          )}
          <Row
            justifyContent="space-between"
            containerStyle={styles.itemInfoContainerStyle}>
            <Text type="textMini" style={styles.labelStyle}>
              {t('common.date')}
            </Text>
            <Text type="textSmall">{formatDate(time)}</Text>
          </Row>
          {crypto_address && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.itemInfoContainerStyle}>
              <Text type="textMini" style={styles.labelStyle}>
                {currency.is_fiat
                  ? t('common.m_fiat-address')
                  : t('common.address')}
              </Text>
              <Text type="textSmall">{crypto_address}</Text>
            </Row>
          )}
          <Row
            justifyContent="space-between"
            containerStyle={styles.itemInfoContainerStyle}>
            <Text type="textMini" style={styles.labelStyle}>
              {t('common.status')}
            </Text>
            <Text type="textSmall" style={{color: statusColor()}}>
              {status_name}
            </Text>
          </Row>
        </>
      )}
    </>
  );
};

export default memo(Transaction);
