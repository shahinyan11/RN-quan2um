import React, {memo} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import Button from '@components/buttons/Button';

import ModalCustomBottom, {IModalCustomBottomProps} from '../ModalCustomBottom';

import styles from './styles';

interface IModalConfirmBankScoreProps extends IModalCustomBottomProps {
  data: {label: string; value: string}[];
  onSubmit: () => void;
}

const ModalConfirmBankScore = ({
  data,
  onSubmit,
  visible,
  onClose,
}: IModalConfirmBankScoreProps) => {
  const {t} = useTranslation();
  return (
    <ModalCustomBottom visible={visible} onClose={onClose}>
      <View style={styles.mainWindowStyle}>
        <Text type="t4">{t('confirm_add_bank.title')}</Text>

        <Text style={styles.subTitleStyle}>
          {`${t('confirm_add_bank.desc_1')}\n${t('confirm_add_bank.desc_2')}`}
        </Text>

        <View style={styles.containerStyle}>
          {data.map((item, index) => (
            <Row justifyContent="space-between" key={index.toString()}>
              <Text type="textSmall" style={styles.labelStyle}>
                {item.label}
              </Text>
              <Text>{item.value}</Text>
            </Row>
          ))}
        </View>

        <Button title={t('deposit_bank_info.button_paid')} onPress={onSubmit} />
      </View>
    </ModalCustomBottom>
  );
};

export default memo(ModalConfirmBankScore);
