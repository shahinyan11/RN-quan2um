import React, {memo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';

import Icon from '@components/icons/Icon';
import Row from '@components/containers/Row';
import Text from '@components/textes/Text';

import styles from './styles';
import {formatDate} from '@utils/fns';

interface ItemHistoryProps {
  currencyCode: string;
  status: string;
  statusName: string;
  amount: string;
  date: number;
  address: string;
  paymentSystem: string;
  commission: string;
  cancelComment?: string;
  is_fiat: boolean;
}

const ItemHistory = ({
  currencyCode,
  amount,
  paymentSystem,
  status,
  statusName,
  date,
  commission,
  address,
  cancelComment,
  is_fiat,
}: ItemHistoryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation();

  const onChangeVisible = () => setIsOpen(!isOpen);

  const statusColor =
    status === 'pending'
      ? EStyleSheet.value('$yellow')
      : status === 'confirmed' || status === 'success'
      ? EStyleSheet.value('$green')
      : EStyleSheet.value('$red');

  return (
    <View>
      <TouchableOpacity onPress={onChangeVisible}>
        <Row
          justifyContent="space-between"
          containerStyle={styles.itemContainerStyle}>
          <View style={styles.columnContainerStyle}>
            <Text type="textMiddle">{currencyCode}</Text>
          </View>
          <View style={styles.columnContainerStyle}>
            <Text
              type="textMiddle"
              style={[styles.centerLabelStyle, {color: statusColor}]}>
              {statusName}
            </Text>
          </View>

          <Row
            justifyContent="flex-end"
            containerStyle={styles.columnContainerStyle}>
            <Text type="textMiddle" style={styles.rightLabelStyle}>
              {amount}
            </Text>
            <Icon
              name={isOpen ? 'arrow-up' : 'arrow-down'}
              containerStyle={styles.iconContainerStyle}
            />
          </Row>
        </Row>
      </TouchableOpacity>
      {isOpen && (
        <>
          <Row justifyContent="space-between">
            <Text type="hint">{t('common.date')}</Text>
            <Text type="textSmall">{formatDate(date)}</Text>
          </Row>
          {address && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.addressContainerStyle}>
              <Text type="hint">
                {is_fiat ? t('common.m_fiat-address') : t('common.address')}
              </Text>
              <Text type="textSmall">{address}</Text>
            </Row>
          )}
          {!!commission && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.addressContainerStyle}>
              <Text type="hint">{t('common.fee')}:</Text>
              <Text type="textSmall">{commission}</Text>
            </Row>
          )}
          {!!paymentSystem && is_fiat && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.addressContainerStyle}>
              <Text type="hint">{t('common.type')}:</Text>
              <Text type="textSmall">{paymentSystem}</Text>
            </Row>
          )}
          {cancelComment && (
            <Row
              justifyContent="space-between"
              containerStyle={styles.addressContainerStyle}>
              <Text type="hint">{t('common.comment')}:</Text>
              <Text type="textSmall" style={styles.descriptionStyle}>
                {cancelComment}
              </Text>
            </Row>
          )}
        </>
      )}
    </View>
  );
};

export default memo(ItemHistory);
