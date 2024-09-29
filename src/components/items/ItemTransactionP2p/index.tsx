import React, {memo, useCallback, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/textes/Text';
import Icon from '@components/icons/Icon';

import {formatDate} from '@utils/fns';
import {IP2PTransaction} from '@store/account/types';

import styles from './styles';
import {stylesGlobal} from '@constants/globalStyles';

interface TransactionProps extends IP2PTransaction {
  successColor: string;
  errorColor: string;
  alertColor: string;
  fee_face?: string;
}

const Transaction = ({
  status,
  status_name,
  type,
  amount_face,
  time,
  successColor,
  alertColor,
  errorColor,
  comment,
  account_id,
  is_receive,
  fee_face,
  currency,
}: TransactionProps) => {
  const [isInfoVisible, setInfoVisible] = useState(false);
  const {t} = useTranslation();

  const statusColor = useCallback(
    () => (status === 1 ? successColor : alertColor),
    [status, alertColor, successColor],
  );

  const typeColor = useCallback(
    () => (is_receive ? successColor : errorColor),
    [is_receive, errorColor, successColor],
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
          <Text>
            {amount_face} {currency}
          </Text>
        </View>
        <View style={styles.boxContainerStyle}>
          <Text textAlign="center" style={{color: typeColor()}}>
            {t(type)}
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
          <Row
            justifyContent="space-between"
            containerStyle={styles.itemInfoContainerStyle}>
            <Text type="textMini" style={styles.labelStyle}>
              {t('common.user_id')}
            </Text>
            <Text type="textSmall">{account_id}</Text>
          </Row>
          <Row
            justifyContent="space-between"
            containerStyle={styles.itemInfoContainerStyle}>
            <Text type="textMini" style={styles.labelStyle}>
              {t('common.date')}
            </Text>
            <Text type="textSmall">{formatDate(time)}</Text>
          </Row>
          <Row
            justifyContent="space-between"
            containerStyle={styles.itemInfoContainerStyle}>
            <Text type="textMini" style={styles.labelStyle}>
              {t('common.status')}
            </Text>
            <Text type="textSmall" style={{color: statusColor()}}>
              {t(status_name)}
            </Text>
          </Row>
          {Boolean(comment) && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.itemInfoContainerStyle}>
              <Text type="textMini" style={styles.labelStyle}>
                {t('common.comment')}
              </Text>
              <Text
                type="textSmall"
                textAlign="right"
                style={stylesGlobal.flexOne}>
                {comment}
              </Text>
            </Row>
          )}

          <Row
            justifyContent="space-between"
            containerStyle={styles.itemInfoContainerStyle}>
            <Text type="textMini" style={styles.labelStyle}>
              {t('common.fee')}
            </Text>
            <Text
              type="textSmall"
              textAlign="right"
              style={stylesGlobal.flexOne}>
              {fee_face} {currency}
            </Text>
          </Row>
        </>
      )}
    </>
  );
};

export default memo(Transaction);
