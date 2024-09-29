import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import ModalCustomBottom, {IModalCustomBottomProps} from '../ModalCustomBottom';
import Row from '@components/containers/Row';
import ImageGradient from '@components/icons/ImageGradient';
import Button from '@components/buttons/Button';

import styles from './styles';

import {scaledSize} from '@utils/scaledSize';
import bigDecimal from 'js-big-decimal';

interface IModalConfirmBankWithdrawal extends IModalCustomBottomProps {
  amount: string;
  currencyCode: string;
  currencyIcon: string;
  currencyColors: string[];
  fee: string;
  feePercent: string;
  score: string;
  onSubmit: () => void;
}

const ModalConfirmBankWithdrawal = ({
  amount,
  currencyCode,
  currencyIcon,
  currencyColors,
  fee,
  score,
  feePercent,
  onClose,
  visible,
  onSubmit,
}: IModalConfirmBankWithdrawal) => {
  const {t} = useTranslation();
  const toCredit = bigDecimal.subtract(+amount, +fee);
  return (
    <ModalCustomBottom visible={visible} onClose={onClose}>
      <Text type="t4">{t('withdrawal_bank_confirm.title')}</Text>

      <Text type="textMini" style={styles.subtitleStyle}>
        {t('common.to_credit')}
      </Text>

      <Row containerStyle={styles.currencyAmountStyle}>
        <ImageGradient
          url={currencyIcon}
          colors={currencyColors}
          iconContainerStyle={styles.iconContainerStyle}
          iconSize={scaledSize(15)}
        />
        <Text type="t3">
          {toCredit} {currencyCode}
        </Text>
      </Row>

      <Row justifyContent={'space-between'}>
        <Text>{t('withdrawal_bank_confirm.confirm_btn')}:</Text>
        <Text style={styles.valueStyle}>
          {t('withdrawal_bank_confirm.quan2um_balance')}
        </Text>
      </Row>
      <Row justifyContent={'space-between'} containerStyle={styles.rowWrap}>
        <Text>{t('withdrawal_bank_confirm.to')}:</Text>
        <Text>{score}</Text>
      </Row>
      <Row justifyContent={'space-between'}>
        <Text>{t('common.m_fee', {value: feePercent})}</Text>
        <Text>
          {fee} {currencyCode}
        </Text>
      </Row>
      <Row justifyContent={'space-between'}>
        <Text>{t('common.total')}:</Text>
        <Text>
          {+amount} {currencyCode}
        </Text>
      </Row>

      <Button title={t('common.confirm')} onPress={onSubmit} />
      <Button
        type="cancel"
        title={t('common.cancel')}
        onPress={onClose}
        buttonContainerStyle={styles.btnContainerStyle}
      />
    </ModalCustomBottom>
  );
};

export default memo(ModalConfirmBankWithdrawal);
