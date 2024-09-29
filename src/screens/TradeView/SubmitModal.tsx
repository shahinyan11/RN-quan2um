import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import Text from '@components/textes/Text';
import Row from '@components/containers/Row';
import ModalCustom from '@components/modals/ModalCustom';

import {selectPair} from '@store/tradeview';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '@components/buttons/Button';

const SubmitModal = ({
  visible,
  setVisibleModal,
  operationText,
  data,
  onSubmit,
  isBuy,
}: any) => {
  const {t} = useTranslation();
  const pair = useSelector(selectPair);

  const green = EStyleSheet.value('$green');
  const red = EStyleSheet.value('$red');

  const handleSubmit = () => {
    onSubmit();
    setVisibleModal();
  };

  const pairCurrencyText = `${pair.main_currency.code}/${pair.base_currency.code}`;
  return (
    <ModalCustom onClose={setVisibleModal} visible={visible}>
      <Text type="t3" style={styles.rowStyle}>
        {t('create_order.order_confirm')}
      </Text>
      <Row justifyContent="space-between" containerStyle={styles.rowStyle}>
        <Text>{pairCurrencyText}</Text>
        <Text style={{color: isBuy ? green : red}}>{operationText}</Text>
      </Row>
      <Row justifyContent="space-between" containerStyle={styles.rowStyle}>
        <Text style={styles.desc}>{t('common.price')}:</Text>
        <Text>{`${data.price} ${pair.base_currency.code}`}</Text>
      </Row>
      <Row justifyContent="space-between" containerStyle={styles.rowStyle}>
        <Text style={styles.desc}>{t('common.quantity')}:</Text>
        <Text>{`${data.quantity} ${pair.main_currency.code}`}</Text>
      </Row>
      <Row justifyContent="space-between" containerStyle={styles.rowStyle}>
        <Text style={styles.desc}>{t('common.total')}:</Text>
        <Text>{`${data.total} ${pair.base_currency.code}`}</Text>
      </Row>
      <Row justifyContent="space-between" containerStyle={styles.rowButtons}>
        <Button
          buttonContainerStyle={styles.cancelBtn}
          containerStyle={styles.cancelContainerStyle}
          title={t('common.cancel')}
          onPress={setVisibleModal}
          titleStyle={styles.titleStyle}
        />
        <Button
          title={t('common.confirm')}
          onPress={handleSubmit}
          containerStyle={styles.confirmContainerStyle}
          titleStyle={styles.titleStyle}
        />
      </Row>
    </ModalCustom>
  );
};

const styles = EStyleSheet.create({
  desc: {
    color: '$white50',
  },
  rowStyle: {
    marginVertical: 5,
  },
  rowButtons: {
    marginTop: 20,
  },
  cancelContainerStyle: {
    flex: 1,
    marginRight: 5,
  },
  cancelBtn: {
    backgroundColor: '$red',
  },
  confirmContainerStyle: {
    marginLeft: 5,
    flex: 1,
  },
  titleStyle: {
    fontSize: 14,
  },
});

export default SubmitModal;
