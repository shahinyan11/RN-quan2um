import React, {useState, memo, useCallback, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import bigDecimal from 'js-big-decimal';

import ButtonGradient from '@components/buttons/ButtonGradient';
import ExtraContainer from '@components/containers/ExtraContainer';
import Row from '@components/containers/Row';
import ModalConfirmBankWithdrawal from '@components/modals/ModalConfirmBankWithdrawal';
import Button from '@components/buttons/Button';
import KeyboardListener from '@components/listeners/KeyboardListener';
import Input from '@components/inputs/Input';
import Text from '@components/textes/Text';
import ModalTFA from '@components/modals/ModalTFA';

import {selectWallet} from '@store/account/selectors';
import {BankRequisite, PaymentSystem} from '@store/account/types';

import {stylesGlobal} from '@constants/globalStyles';

import styles from './styles';
import {onWithdrawCreate} from '@store/account';
import {getMaxAmount} from '@utils/index';
import {validateAmount} from '@utils/validation';
import {AppsFlyerLogEvent, withdraw_fiat} from '@utils/appsflyer';

const PaymentTransaction = ({
  onPaymentSystemClear,
  selectedPaymentSystem,
  walletId,
}: {
  walletId: number;
  selectedPaymentSystem: PaymentSystem;
  onPaymentSystemClear: () => void;
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const walletData = useSelector(selectWallet);
  const slug = selectedPaymentSystem.slug;

  const [amount, setAmount] = useState('');
  const [isTfaVisible, setTfaVisible] = useState(false);
  const [isValid, setValid] = useState(false);
  const [fee, setFee] = useState('0');
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);

  const [requisites, setRequisites] = useState('');

  const [selectedRequisite, setSelectedRequisite] = useState(
    undefined as BankRequisite | undefined,
  );

  const onChangeModalTfaVisible = useCallback(
    () => setTfaVisible(!isTfaVisible),
    [isTfaVisible],
  );

  const onChangeConfirmModalVisible = useCallback(() => {
    setConfirmModalVisible(!isConfirmModalVisible);
  }, [isConfirmModalVisible]);

  const onPressMax = () => {
    const tempMaxAmount = getMaxAmount({
      balance: walletData.balance,
      feePercent: walletData.fee_percent,
      maxAmount: walletData.amount_max,
    });
    setAmount(tempMaxAmount);
  };

  const onAddScore = useCallback(() => {
    try {
      navigation.navigate('BankAccountAdd', {
        currencyId: walletData.currency.id,
        walletId: walletId,
      });
    } catch (e) {
      console.log('[HINT]: Not selected payment system');
    }
  }, [navigation, walletId, walletData]);

  useEffect(() => {
    try {
      const percentSum = bigDecimal.multiply(
        +amount,
        +selectedPaymentSystem.fee_percent,
      );
      const tempFee = bigDecimal.divide(percentSum, 100, 2);

      setFee(tempFee);
    } catch (e) {
      console.log('[ERROR]: Getting fee');
    }
  }, [amount, walletData.fee_percent]);

  useEffect(() => {
    const isAmountValid = validateAmount({
      amount,
      maxAmount: +walletData.amount_max,
      minAmount: +walletData.amount_min,
      balance: +walletData.balance,
    });

    if (slug !== 'bank-transfer') {
      setValid(isAmountValid && !!requisites);
      return;
    }
    setValid(isAmountValid && !!selectedRequisite);
  }, [
    amount,
    walletData.amount_max,
    walletData.amount_min,
    walletData.balance,
    selectedRequisite,
    fee,
    requisites,
    slug,
  ]);

  const onSubmitTransfer = useCallback(() => {
    setConfirmModalVisible(false);
    onChangeModalTfaVisible();
  }, [onChangeModalTfaVisible]);

  const onConfirm = () => {
    const params = {
      currency_id: walletData.currency.id,
      amount: +amount,
      payment_system_id: selectedPaymentSystem?.id,
      requisite_id:
        selectedPaymentSystem.slug !== 'bank-transfer'
          ? selectedPaymentSystem.id
          : selectedRequisite?.id,
      requisites:
        selectedPaymentSystem.slug !== 'bank-transfer'
          ? requisites
          : selectedRequisite?.iban,
      is_mobile: 1,
    };
    dispatch(onWithdrawCreate(params, null, onSubmitTransfer));
  };

  const onSuccess = useCallback(() => {
    navigation.navigate('WithdrawalVerification');
    setSelectedRequisite(undefined);
    setAmount('');
    onChangeModalTfaVisible();
  }, [onChangeModalTfaVisible, navigation]);

  const onSubmit = useCallback(
    (tfa_code: string) => {
      const config = {
        currency_id: walletData.currency.id,
        amount: +amount,
        payment_system_id: selectedPaymentSystem?.id,
        requisite_id:
          selectedPaymentSystem.slug !== 'bank-transfer'
            ? selectedPaymentSystem.id
            : selectedRequisite?.id,
        requisites:
          selectedPaymentSystem.slug !== 'bank-transfer'
            ? requisites
            : selectedRequisite?.iban,
        is_mobile: 1,
        tfa_code,
      };
      dispatch(onWithdrawCreate(config, onSuccess));

      AppsFlyerLogEvent(withdraw_fiat, config);
    },
    [
      amount,
      selectedPaymentSystem,
      selectedRequisite?.id,
      selectedRequisite?.iban,
      walletData.currency.id,
      onSuccess,
      requisites,
    ],
  );

  return (
    <KeyboardListener>
      <View style={stylesGlobal.fullScale}>
        <Input
          withAction
          keyboardType="numeric"
          actionLabel={`${walletData.balance_face || 0} ${
            walletData.currency.code || 'BTC'
          }`}
          onPressAction={onPressMax}
          label={t('input.label_amount')}
          placeholder={`Min ${walletData.amount_min_face} ${walletData.currency.code} - Max ${walletData.amount_max_face} ${walletData.currency.code}`}
          containerStyle={styles.inpContainerStyle}
          value={amount}
          onChangeText={setAmount}
        />

        <Text type="textMini" style={styles.amountDailyMaxStyle}>
          {t('withdrawal_cripto.withdrawal_limit')}{' '}
          <Text type="textMini" style={styles.amountDailyMaxAmountStyle}>
            {walletData.amount_daily_max_face} {walletData.currency.code}
          </Text>
        </Text>

        <ExtraContainer
          slug={slug}
          walletId={walletId}
          requisites={requisites}
          setRequisites={setRequisites}
          onAddScore={onAddScore}
          selectedRequisite={selectedRequisite}
          selectedPaymentSystem={selectedPaymentSystem}
          setSelectedRequisite={setSelectedRequisite}
        />
      </View>
      <>
        <Row
          justifyContent="space-between"
          containerStyle={styles.infoContainerStyle}>
          <Text type="textSmall" style={styles.feeStyle}>
            {t('common.balance')}:
          </Text>
          <Text type="textSmall">{`${walletData.balance_face} ${walletData.currency.code}`}</Text>
        </Row>
        <Row
          justifyContent="space-between"
          containerStyle={styles.infoContainerStyle}>
          <Text type="textSmall" style={styles.feeStyle}>
            {t('common.fee')} ({selectedPaymentSystem.fee_percent}%):
          </Text>
          <Text type="textSmall">{`${fee} ${walletData.currency.code}`}</Text>
        </Row>
        <ButtonGradient
          disabled={!isValid}
          title={t('common.next_step')}
          onPress={onChangeConfirmModalVisible}
        />

        <Button
          type="cancel"
          title={t('common.cancel')}
          onPress={onPaymentSystemClear}
          containerStyle={styles.cancelButtonContainerStyle}
        />
      </>

      <ModalConfirmBankWithdrawal
        visible={isConfirmModalVisible}
        onClose={onChangeConfirmModalVisible}
        onSubmit={onConfirm}
        amount={amount}
        fee={fee}
        feePercent={selectedPaymentSystem?.fee_percent}
        currencyCode={walletData.currency.code}
        currencyIcon={walletData.currency.logo_png}
        currencyColors={[
          walletData.currency.color_hex,
          walletData.currency.color_hex2,
        ]}
        score={selectedRequisite?.iban || requisites}
      />

      <ModalTFA
        visible={isTfaVisible}
        onClose={onChangeModalTfaVisible}
        onSubmit={onSubmit}
      />
    </KeyboardListener>
  );
};

export default memo(PaymentTransaction);
