import React, {useState, useEffect, memo} from 'react';
import {useSelector} from 'react-redux';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Text from '@components/textes/Text';
import Button from '@components/buttons/Button';
import Row from '@components/containers/Row';
import KeyboardListener from '@components/listeners/KeyboardListener';
import Input from '@components/inputs/Input';

import {PaymentSystem} from '@store/account/types';

import {selectWallet} from '@store/account/selectors';

import styles from '../styles';
import {validateNumber} from '@utils/validation';
import {getMaxAmount} from '@utils/index';
import {useTranslation} from 'react-i18next';

type PaymentScreenProps = {
  selectedPaymentSystem: PaymentSystem;
  onBack: () => void;
};

const BankTransfer = ({onBack, selectedPaymentSystem}: PaymentScreenProps) => {
  const walletData = useSelector(selectWallet);
  const navigation = useNavigation();
  const [isValid, setValid] = useState(false);
  const {t} = useTranslation();
  const {
    currency,
    fee_percent = 0,
    amount_min_face,
    amount_max_face,
    amount_max,
    balance,
    amount_min,
    balance_face,
  } = walletData;
  const [amount, setAmount] = useState('');

  const commission = +amount * (+fee_percent / 100);
  const clearAmount = +amount - commission;

  const onSubmit = () => {
    navigation.navigate('RefillConfirmFiat', {
      paymentSystem: selectedPaymentSystem,
      amount,
    });
  };

  const onEnterAmount = (value: string) => {
    try {
      if (validateNumber(value)) {
        const tempValue = value.replace(',', '.');
        setAmount(tempValue);
      }
    } catch (e) {
      console.log('Enter amount error');
    }
  };

  const onPressMax = () => {
    const tempMaxAmount = getMaxAmount({
      balance,
      feePercent: fee_percent,
      maxAmount: amount_max,
    });

    setAmount(tempMaxAmount);
  };

  useEffect(() => {
    setValid(+amount <= +amount_max && +amount >= +amount_min);
  }, [amount, amount_max, amount_min]);

  useEffect(() => {
    const blurListener = navigation.addListener('blur', () => {
      setValid(false);
      setAmount('');
    });

    return blurListener;
  }, [navigation]);

  return (
    <KeyboardListener containerStyle={styles.mainContainerStyle}>
      <View style={styles.bodyContainerStyle}>
        <Input
          label={t('input.label_amount')}
          placeholder={`Min ${amount_min_face} ${currency.code} - Max ${amount_max_face} ${currency.code}`}
          withAction
          actionLabel={`${balance_face} ${currency.code}`}
          onPressAction={onPressMax}
          onChangeText={onEnterAmount}
          keyboardType="numeric"
          value={amount}
        />

        <View>
          <Row
            justifyContent="space-between"
            containerStyle={styles.hintContainerStyle}>
            <Text type="textSmall" style={styles.labelStyle}>
              {t('common.balance')}:
            </Text>
            <Text type="textSmall">
              {balance_face} {currency.code}
            </Text>
          </Row>
          <Row
            justifyContent="space-between"
            containerStyle={styles.hintContainerStyle}>
            <Text type="textSmall" style={styles.labelStyle}>
              {`${t('common.fee')} ${fee_percent}%:`}
            </Text>
            <Text type="textSmall">
              {`${commission.toFixed(2)} ${currency.code}`}
            </Text>
          </Row>
          <Row
            justifyContent="space-between"
            containerStyle={styles.hintContainerStyle}>
            <Text type="textSmall" style={styles.labelStyle}>
              {t('bonus_covid.to_receive')}:
            </Text>
            <Text type="textSmall">{`${clearAmount} ${currency.code}`}</Text>
          </Row>
        </View>
      </View>

      <Button
        disabled={!isValid}
        title={t('common.next_step')}
        onPress={onSubmit}
        containerStyle={styles.btnContainerStyle}
      />
      <Button type="cancel" title={t('common.back')} onPress={onBack} />
    </KeyboardListener>
  );
};

export default memo(BankTransfer);
